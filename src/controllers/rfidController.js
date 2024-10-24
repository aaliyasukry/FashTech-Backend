const { messaging } = require('firebase-admin');
const db = require('../config/firebaseConfig');
const ShoppingBag = require('../models/ShoppingBag');
const Piece = require('../models/Piece');

// Real-time listener to listen for new RFID tag scans
const listenForRFIDTags = () => {
    const ref = db.ref('rfid-cards'); // Reference the 'rfid-cards' node in the database

    // Set up a listener for when new children (RFID tags) are added
    ref.on('child_added', async (snapshot) => {
        const newRFID = snapshot.key; // Get the new RFID tag (the key)
        const uid = snapshot.val(); // Get the UID associated with the RFID tag

        console.log(`New RFID Tag Scanned: ${newRFID}, UID: ${uid}`);

        // Call the function to check if the RFID exists in the database
        try {
            const result = await checkRFIDFromListener(newRFID); // Pass the RFID directly
            console.log('RFID check result:', result);
        } catch (error) {
            console.error('Error checking RFID from listener:', error);
        }    
    });

    // Listener for existing RFID tag being scanned again (child changed)
    ref.on('child_changed', async (snapshot) => {
        const existingRFID = snapshot.key;
        const uid = snapshot.val();

        console.log(`Existing RFID Tag Scanned Again: ${existingRFID}, UID: ${uid}`);
        // Handle the repeated scan here
        try {
            const result = await checkRFIDFromListener(existingRFID);
            console.log('RFID check result (child_changed):', result);
        } catch (error) {
            console.error('Error checking RFID (child_changed):', error);
        }
    });
};

listenForRFIDTags();

const checkRFIDFromListener = async (rfid) => {
    try {
        if (!rfid) {
            throw new Error("RFID is required");
        }
        console.log("RFID provided:", rfid);
        
        const allPieces = await Piece.getAll();
        const allBags = await ShoppingBag.getAll();
        console.log(allBags);

        const pieceExists = allPieces.find(piece => piece.TagUID === rfid);
        const bagExists = allBags.find(bag => bag.BagRFID === rfid);
        
        if (bagExists) {
            return {
                success: true,
                message: "RFID exists in ShoppingBag",
                type: "bag",
                data: bagExists,
            };
        }

        if (pieceExists) {
            return {
                success: true,
                message: "RFID exists in Pieces",
                type: "piece",
                data: pieceExists,
            };
        }

        return {
            success: false,
            message: "RFID does not exist in either ShoppingBag or Pieces",
        };
    } catch (error) {
        console.error("Error checking RFID:", error);
        throw new Error(error.message);
    };
}

const checkRFID = async (req, res) => {
    const { rfid } = req.body;

    try {
        if (!rfid) {
            return res.status(400).json({ message: "RFID is required" });
        }
        const result = await checkRFIDFromListener(rfid);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred while checking the RFID",
            error: error.message,
        });
    }
};

module.exports = {
    listenForRFIDTags,
};
