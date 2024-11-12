// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
 
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
auth.onAuthStateChanged((user) => {
    //add the paths to the conditionals to ensure the program doesn't try to
    //navigate to the page when it is already on that page.
    if (user && location.pathname != "/week-9/shopping-list") {
      //when the user signs in, redirect to the shopping list
      location.pathname = "/week-9/shopping-list";
    } if (!user && location.pathname != "/week-9") {
      //when the user signs out, navigate to the sign in page
      location.pathname = "/week-9";
    }
});
