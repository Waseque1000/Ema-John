import React, { children, createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import app from "../Firebase/Firebase-config";

const auth = getAuth(app);
//? create context
export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  // ?
  //   const user = { email: "Brazil" }; // ! for  check
  const [user, setUser] = useState(null);
  //
  const [loading, setLoading] = useState(true);

  // ! creat user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //? log in user
  const logIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  //! sign out
  const logOut = () => {
    return signOut(auth);
  };

  // ? observer user auth state
  useEffect(() => {
    const off = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      return off;
    };
  }, []);

  //!
  const authInfo = {
    user,
    createUser,
    logIn,
    logOut,
    loading,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
