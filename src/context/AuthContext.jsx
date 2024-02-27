import React from "react";
import { useContext, useState, useEffect } from "react";

import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  function signUp(email, password, name) {
    console.log("got here ", name);
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
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  function logout() {
    console.log("logout got here");
    return auth.signOut();
  }

  const value = {
    displayName,
    currentUser,
    signUp,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
