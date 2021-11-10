import { initializeApp } from "firebase/app";

// console.log(process.env);
//Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_YASIR_API_KEY,
  authDomain: process.env.REACT_APP_YASIR_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_YASIR_PROJECT_ID,
  storageBucket: process.env.REACT_APP_YASIR_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_YASIR_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_YASIR_APP_ID
};

// Initialize Firebase
const initializeAuthentication = () => {
  return initializeApp(firebaseConfig);
};

export default initializeAuthentication;