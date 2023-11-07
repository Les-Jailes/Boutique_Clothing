import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDh1UuyrKdCVsnxqZcUPgCqR_ngrWe9fhU",
  authDomain: "les-jailes-a975c.firebaseapp.com",
  projectId: "les-jailes-a975c",
  storageBucket: "les-jailes-a975c.appspot.com",
  messagingSenderId: "968212800587",
  appId: "1:968212800587:web:5d23635d53c649427a59ce"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);