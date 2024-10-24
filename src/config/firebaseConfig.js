const admin = require('firebase-admin');
const serviceAccount = require('../../serviceAccountKey.json'); // Make sure to keep this file safe and not expose it in public repositories

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://fashtech-160f3-default-rtdb.firebaseio.com/"
});

const db = admin.database();

module.exports = db;
