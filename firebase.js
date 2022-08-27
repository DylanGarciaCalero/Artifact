import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth"

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBQwjR3i7MURqxKxmcq04qOYKqpNXbdn08",
    authDomain: "artifact-8ea44.firebaseapp.com",
    databaseURL: "https://artifact-8ea44-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "artifact-8ea44",
    storageBucket: "artifact-8ea44.appspot.com",
    messagingSenderId: "530425847073",
    appId: "1:530425847073:web:dcc5089e47e8e2eacaf260",
    measurementId: "G-PYZXPZXX4H"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app)

export {
    db,
    auth
}