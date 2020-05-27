import React, { useEffect, useState } from "react";
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
      console.log(user);
      const userObject = user || {};
      setCurrentUser(userObject);
      setPending(false);
    });
  }, []);

  if (pending) {
    return <>Loading...</>;
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
