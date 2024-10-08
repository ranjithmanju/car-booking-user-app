import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCoGOMBXGJvukVYBNMpxV-EpBQ5MfCS2Ng",
  authDomain: "car-booking-user-app.firebaseapp.com",
  projectId: "car-booking-user-app",
  storageBucket: "car-booking-user-app.appspot.com",
  messagingSenderId: "755726524612",
  appId: "1:755726524612:web:6ee59ae1552e9aa3592991",
  measurementId: "G-KG8GZFCCKS",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
