import React, { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUid, setCurrentUid] = useState("");
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  const [pending, setPending] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      if (user) {
        setCurrentUid(user.uid);
        setCurrentUserEmail(user.email);
      }
      setPending(false);
    });
  }, []);

  if (pending) {
    return <>Loading...</>;
  }

  return (
    <AuthContext.Provider value={{ currentUser, currentUid, currentUserEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
