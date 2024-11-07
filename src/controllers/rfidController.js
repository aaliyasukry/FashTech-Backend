const { messaging } = require('firebase-admin');
const db = require('../config/firebaseConfig');
const Bag = require('../models/Bag');  // Use Bag model here
const Piece = require('../models/Piece');
const Variant = require('../models/Variant');

const listenForRFIDTags = () => {
    const ref = db.ref('rfid-cards');

    ref.on('child_added', async (snapshot) => {
        const newRFID = snapshot.key;
        const uid = snapshot.val();

        console.log(`New RFID Tag Scanned: ${newRFID}, UID: ${uid}`);

        try {
            const result = await checkRFIDFromListener(newRFID);
            console.log('RFID check result:', result);
        } catch (error) {
            console.error('Error checking RFID from listener:', error);
        }    
    });

    ref.on('child_changed', async (snapshot) => {
        const existingRFID = snapshot.key;
        const uid = snapshot.val();

        console.log(`Existing RFID Tag Scanned Again: ${existingRFID}, UID: ${uid}`);

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
        const allBags = await Bag.getAll();  // Use Bag model here
        console.log(allBags);

        const pieceExists = allPieces.find(piece => piece.TagUID === rfid);
        const bagExists = allBags.find(bag => bag.BagRFID === rfid);  // Check against Bag table
        const variantData = await Variant.getById(pieceExists.VariantId);
        
        if (bagExists) {
            return {
                success: true,
                message: "RFID exists in Bag",
                type: "bag",
                data: bagExists,
            };
        }

        if (pieceExists) {
            return {
                success: true,
                message: "RFID exists in Pieces",
                type: "piece",
                data: {
                    ...pieceExists,
                    variantData,
                },
            };
        }

        return {
            success: false,
            message: "RFID does not exist in either Bag or Pieces",
        };
    } catch (error) {
        console.error("Error checking RFID:", error);
        throw new Error(error.message);
    };
}

module.exports = {
    listenForRFIDTags,
};
