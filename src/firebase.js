import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBov9ZSMjwH-QNAn9JhOaZ1P0segipvOMA",
    authDomain: "ruta-bcc41.firebaseapp.com",
    projectId: "ruta-bcc41",
    storageBucket: "ruta-bcc41.appspot.com",
    messagingSenderId: "876690532508",
    appId: "1:876690532508:web:ed63c574d4dac0b44aa559",
    measurementId: "G-LEVEWT7QFJ"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);