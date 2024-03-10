import React from "react";
import { useContext, useState, useEffect } from "react";

import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
        setDisplayName(user.displayName);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  function signUp(email, password, name) {
    setErrorMessage("");
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {
            setDisplayName(auth.currentUser.displayName);
          })
          .catch((error) => {
            console.log("Error updating Display Name ", error);
            setErrorMessage(error.message);
            console.log(error.code, error.message);
          });
      })
      .catch((error) => {
        setErrorMessage(error.message);
        console.log(error.code, error.message);
      });
  }

  function signIn(email, password) {
    setErrorMessage("");
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setDisplayName(auth.currentUser.displayName);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        console.log(error.code, error.message);
      });
  }

  function logout() {
    return auth.signOut();
  }

  const value = {
    displayName,
    currentUser,
    errorMessage,
    signUp,
    signIn,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
