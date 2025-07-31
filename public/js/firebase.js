// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js"; 

const firebaseConfig = {
  apiKey: "AIzaSyB2FU7yykGGZqEAnBORmTlgAMRHXGda1dc",
  authDomain: "pathora-f706b.firebaseapp.com",
  projectId: "pathora-f706b",
  storageBucket: "pathora-f706b.firebasestorage.app",
  messagingSenderId: "1027650639715",
  appId: "1:1027650639715:web:30b9e441baee2f52022556",
  measurementId: "G-1C6MKBQJZT"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); 
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export async function loginWithGoogle() {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("❌ Error during Google sign-in:", error);
    alert("Login failed: " + error.message);
  }
}

export { db, auth, provider, signInWithPopup };
