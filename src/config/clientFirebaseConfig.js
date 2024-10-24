import { initializeApp } from "firebase-admin";
import { getDatabase } from "firebase-admin/database";

const firebaseConfig = {
    apiKey: "AIzaSyDKMJYKdp1VsJTCGKhDu2CLe0SN-8OkYNU",
    authDomain: "fashtech-160f3.firebaseapp.com",
    databaseURL: "https://fashtech-160f3-default-rtdb.firebaseio.com",
    projectId: "fashtech-160f3",
    storageBucket: "fashtech-160f3.appspot.com",
    messagingSenderId: "622316838080",
    appId: "1:622316838080:web:ee40dd35e42af16df16125",
    measurementId: "G-DQSNNLV04E"
  };

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)

export { db };