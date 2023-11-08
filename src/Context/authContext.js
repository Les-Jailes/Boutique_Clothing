import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/firebase/Firebase";
import User from '@/Models/UserGoogle';

export const signInWithGoogle = async () => {
  const googleProvider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    const userData = {
      name: user.displayName,
      lastName: '', 
      email: user.email,
      gender: '',
      imagePath: user.photoURL,
    };

    await User.findOneAndUpdate({ email: user.email }, userData, { upsert: true, new: true });
    console.log('User saved to database');
  } catch (error) {
    console.error('Error during signInWithGoogle:', error);
  }
};
