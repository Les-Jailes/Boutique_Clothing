import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/firebase/Firebase";

export const signInWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider)
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    });
};