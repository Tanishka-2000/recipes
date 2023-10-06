import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { firebaseConfig } from "../../keys";

const firebaseConfig = {
    apiKey: "AIzaSyA7CRAAy09DqY9s49jKtLxLeCOZO8mOXhU",
    authDomain: "recipies-43532.firebaseapp.com",
    projectId: "recipies-43532",
    storageBucket: "recipies-43532.appspot.com",
    messagingSenderId: "423506797008",
    appId: "1:423506797008:web:00e52cadeb94995771d9d5"
}

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();