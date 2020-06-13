import React, { useEffect, useState } from "react";
import classes from "./AuthProvider.module.css";
import { auth } from "../../firebase/firebase";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [pending, setPending] = useState(true);

  const setAllValues = ({ currentUser }) => {
    setCurrentUser(currentUser);
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      const userObject = user || {};
      setCurrentUser(userObject);
      setPending(false);
    });
  }, []);

  if (pending) {
    return (
      <div className={classes.Loader_Wraper}>
        <div className={classes.Loader}></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        currentUid: currentUser.uid,
        currentUserEmail: currentUser.email,
        setAllValues,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
