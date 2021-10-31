import React, { createContext, useEffect, useState } from "react";
import "firebase/compat/auth";
import { auth } from "./FirebaseConfig";

export const FirebaseData = createContext();

const FirebaseContext = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");

  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    return auth.signOut();
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);
  
  useEffect(() => {
    if (userName !== "") {
      currentUser
        .updateProfile({
          displayName: userName,
        })
        .then(() => {
          console.log(currentUser);
        })
        .catch((err) => console.log(err));
    }
  }, [userName, currentUser]);

  const contexts = {
    currentUser,
    signup,
    login,
    logout,
    userName,
    setUserName,
  };
  return (
    <FirebaseData.Provider value={contexts}>
      {!loading && children}
    </FirebaseData.Provider>
  );
};

export default FirebaseContext;
