import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

// Your Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyA1Jy9gGkoUoSHvi9D51Rx75_4Fu7MjhPg",
  authDomain: "netflix-clone-70025.firebaseapp.com",
  projectId: "netflix-clone-70025",
  storageBucket: "netflix-clone-70025.appspot.com",
  messagingSenderId: "1030002504527",
  appId: "1:1030002504527:web:e83e2c3e1b4baa09738b3a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Signup function
const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    // Save user info to Firestore (uid = doc id)
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });

    console.log("✅ User signed up and saved:", user.uid);
  } catch (error) {
    console.error("❌ Signup Error:", error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

// Login function
const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log("✅ User logged in:", email);
  } catch (error) {
    console.error("❌ Login Error:", error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

// Logout function
const logout = () => {
  signOut(auth)
    .then(() => console.log("✅ User logged out"))
    .catch((error) => console.error("❌ Logout Error:", error));
};

export { auth, db, login, signup, logout };
