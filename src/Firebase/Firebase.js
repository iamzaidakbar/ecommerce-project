// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyA31JqN-_yYXLSUfIp_pHN093TSgAGLsQk",
    authDomain: "ecomerce-3a900.firebaseapp.com",
    projectId: "ecomerce-3a900",
    storageBucket: "ecomerce-3a900.appspot.com",
    messagingSenderId: "717121797791",
    appId: "1:717121797791:web:efe2d51803efa7bd75acaa",
    measurementId: "G-V6D95FFCED"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;