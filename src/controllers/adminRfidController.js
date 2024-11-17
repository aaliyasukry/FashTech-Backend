const { messaging } = require('firebase-admin');
const db = require('../config/firebaseConfig');
const Bag = require('../models/Bag');
const BagItem = require('../models/BagItem');
const Item = require('../models/Item');

let latestAdminRFIDData = null;  // Store the latest RFID data

// Keep the listener active to track the latest RFID data from Firebase
const listenForAdminRFIDTags = () => {
    const ref = db.ref('rfid-tags'); 

    ref.on('child_added', async (snapshot) => {
        const newRFID = snapshot.key;
        const uid = snapshot.val();

        console.log(`New RFID Tag Scanned (Admin): ${newRFID}, UID: ${uid}`);

        try {
            const result = await checkBagRFID(newRFID);  // Check bag for this RFID tag
            console.log('RFID check result (admin):', result);
            latestAdminRFIDData = result;  // Store the result for later retrieval
        } catch (error) {
            console.error('Error checking RFID (admin):', error);
        }
    });

    ref.on('child_changed', async (snapshot) => {
        const existingRFID = snapshot.key;
        const uid = snapshot.val();

        console.log(`Existing RFID Tag Scanned Again (Admin): ${existingRFID}, UID: ${uid}`);

        try {
            const result = await checkBagRFID(existingRFID);  // Check bag for this RFID tag
            console.log('RFID check result (child_changed) (admin):', result);
            latestAdminRFIDData = result;  // Update the latest data
        } catch (error) {
            console.error('Error checking RFID (child_changed) (admin):', error);
        }
    });
};

// Function to check if the RFID tag is associated with a bag
const checkBagRFID = async (rfid) => {
    try {
        const bagExists = await Bag.findByRFID(rfid);  // Find the bag by RFID tag

        if (bagExists) {
            // If the bag exists, get the bag details
            const bagDetails = await BagItem.getItemsInBag(bagExists.BagId);  // Fetch the bag items using BagId
            return {
                success: true,
                message: "RFID exists in Bag",
                type: "bag",
                data: bagDetails,
            };
        }

        return {
            success: false,
            message: "RFID does not exist in Bag",
        };
    } catch (error) {
        console.error("Error checking RFID (admin):", error);
        throw new Error(error.message);
    }
};

// API endpoint to get the latest RFID data for admin
const getLatestAdminRFIDData = async (req, res) => {
    // Start listening for RFID tags only once when the API is first hit
    if (!latestAdminRFIDData) {
        listenForAdminRFIDTags();  // Start listening to Firebase tags if not already listening
    }

    // Wait for the latest data from Firebase, with a timeout
    const waitForRFIDData = (timeout = 5000) => {
        return new Promise((resolve, reject) => {
            const interval = setInterval(() => {
                if (latestAdminRFIDData) {
                    clearInterval(interval);
                    resolve(latestAdminRFIDData);  // Return the data once it's available
                }
            }, 500);  // Check every 500ms

            setTimeout(() => {
                clearInterval(interval);
                reject("Timeout waiting for RFID data");  // Reject if timeout occurs
            }, timeout);
        });
    };

    try {
        const data = await waitForRFIDData();  // Wait for the data to be fetched
        res.json(data);  // Send the latest RFID data
    } catch (error) {
        console.error("Error:", error);
        res.status(404).json({ success: false, message: "No RFID data available" });
    }
};

listenForAdminRFIDTags();

module.exports = {
    getLatestAdminRFIDData,
};
