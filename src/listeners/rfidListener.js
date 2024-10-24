// listeners/rfidListener.js
const db = require('../config/firebaseConfig');

// Real-time listener to listen for RFID tag scans from Firebase
const ref = db.ref('rfid-cards');

// Listening for new RFID tag entries in Firebase
ref.on('child_added', (snapshot) => {
    const rfidTag = snapshot.key; // Get the tag ID
    console.log(`RFID Tag ${rfidTag} scanned!`);
    // You can implement further logic here later to process the scanned tag
});
