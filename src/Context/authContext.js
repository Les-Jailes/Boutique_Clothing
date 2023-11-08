import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/firebase/Firebase";
import api from "@/app/api/api";

export const signInWithGoogle = async () => {
  const googleProvider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    const userData = {
      ci: user.uid, 
      name: user.displayName ? user.displayName.split(' ')[0] : '', 
      lastName: user.displayName ? user.displayName.split(' ')[1] : '',
      email: user.email,
      password: 'No password', 
      gender: 'No gender', 
      imagePath: user.photoURL
    };

    console.log(userData);
    
    
    const response = await api.post('/User', userData);
  } catch (error) {
    console.error('Error during signInWithGoogle:', error);
  }
};
