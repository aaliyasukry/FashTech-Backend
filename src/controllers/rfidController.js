const { messaging } = require('firebase-admin');
const db = require('../config/firebaseConfig');
const Bag = require('../models/Bag');  
const BagItem = require('../models/BagItem');
const Item = require('../models/Item');
const Piece = require('../models/Piece');
const Variant = require('../models/Variant');

let latestRFIDData = null;

const listenForRFIDTags = () => {
    const ref = db.ref('rfid-cards');

    ref.on('child_added', async (snapshot) => {
        const newRFID = snapshot.key;
        const uid = snapshot.val();

        console.log(`New RFID Tag Scanned: ${newRFID}, UID: ${uid}`);

        try {
            const result = await checkRFIDFromListener(newRFID);
            console.log('RFID check result:', result);
            latestRFIDData = result;
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
            latestRFIDData = result;
        } catch (error) {
            console.error('Error checking RFID (child_changed):', error);
        }
    });
};

const checkRFIDFromListener = async (rfid) => {
    try {
        const allPieces = await Piece.getAll();
        const allBags = await Bag.getAll();  // Use Bag model here

        const pieceExists = allPieces.find(piece => piece.TagUID === rfid); 
        const bagExists = allBags.find(bag => bag.BagRFID === rfid);

        if (pieceExists){
            const variantData = await Variant.getById(pieceExists.VariantId);
            const itemData = await Item.getById(variantData.ItemId);

            return {
                success: true,
                message: "RFID exists in Pieces",
                type: "piece",
                data: {
                    ...pieceExists,
                    variantData,
                    itemData,
                },
            };
        } else if (bagExists) {
            const bagItemData = await BagItem.getItemsInBag(bagExists.BagId);
            return {
                success: true,
                message: "RFID exists in Bag",
                type: "bag",
                data: bagItemData,
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

const getLatestRFIDData = (req, res) => {
    if (latestRFIDData){
        res.json(latestRFIDData);
    } else {
        res.status(404).json({ success: false, message: "No RFID data available"});
    }
};

listenForRFIDTags();

module.exports = {
    getLatestRFIDData
};
