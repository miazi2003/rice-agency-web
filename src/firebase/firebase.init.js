// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARrkM0KOyZWXq3odGUTAMcrCFQ1bv4ryQ",
  authDomain: "rice-agency.firebaseapp.com",
  projectId: "rice-agency",
  storageBucket: "rice-agency.firebasestorage.app",
  messagingSenderId: "415328405185",
  appId: "1:415328405185:web:0118b95d408409bdf57640"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);