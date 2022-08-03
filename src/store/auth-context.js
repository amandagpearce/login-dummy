import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {},
});

export const AuthContextProvider = (props) => { // adding this named import so state can be managed entirely in this file 
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInfo = localStorage.getItem("isLoggedIn");

    if (storedUserLoggedInfo === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    setIsLoggedIn(true);

    localStorage.setItem("isLoggedIn", 1);
  };

  const logoutHandler = () => {
    localStorage.setItem("isLoggedIn", 0);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider // will wrap the entire app in the index.js file and will be read through useContext hook in the App.js file
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext; // this 'tag' will need to wrap whatever components will use this context
