import { useEffect, useState } from "react";
import initializeAuthentication from "../firebase.config";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

import toastCreator from "../components/toastifyCreator";
import Swal from "sweetalert2";

initializeAuthentication();

const useFirebase = () => {
  //All state
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const auth = getAuth();
  //Sign in provider
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  //Google sign in
  const signInUsingGoogle = (redirectPath) => {
    return signInWithPopup(auth, googleProvider)
      .then(data => {
        if (data) {
          Swal.fire({
            title: 'Welcome to Holiday Dreams',
            text: 'Your Travel Partner.',
            imageUrl: 'https://i.ibb.co/GCWvgQZ/travel.png',
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
          });
        } else {
          Swal.fire("Welcome!", "You've logged in Successfully !", "success");
        }

      })
  };

  //Facebook sign in
  const signInUsingFacebook = (redirectPath) => {
    return signInWithPopup(auth, facebookProvider);
  };

  //Update user
  const updateUser = (name) => {
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .catch((error) => {
        setError(error.message);
      });
  };
  //Register user
  const registerUser = (name, email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        updateUser(name);
        window.location.reload();
      })
      .catch((error) => {
        setError(error.message);
        if (error.message.includes("email-already-in-use")) {
          toastCreator("Email already exists!", "error");
        } else {
          toastCreator("Something went wrong!", "error");
        }
      });
  };
  //Login user
  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  //Logout functionality
  const logout = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch((error) => {
        setError(error.message);
        toastCreator("Something went wrong!", "error");
      });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser({});
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [auth]);

  return {
    user,
    setUser,
    error,
    loading,
    signInUsingGoogle,
    signInUsingFacebook,
    registerUser,
    loginUser,
    logout,
  };
};

export default useFirebase;