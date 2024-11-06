// Import the functions you need from the SDKs you need
import {
    initializeApp
} from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDDRfIySY1RlhlSNgQLFsiD-PCeyBuxEN8",
    authDomain: "parka-cf503.firebaseapp.com",
    projectId: "parka-cf503",
    storageBucket: "parka-cf503.appspot.com",
    messagingSenderId: "1042771109024",
    appId: "1:1042771109024:web:be383c4402171094d255c5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);