import React, { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUid, setCurrentUid] = useState("");
  const [pending, setPending] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setCurrentUid(user.uid);
      setPending(false);
    });
  }, []);

  if (pending) {
    return <>Loading...</>;
  }

  return (
    <AuthContext.Provider value={{ currentUser, currentUid }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
