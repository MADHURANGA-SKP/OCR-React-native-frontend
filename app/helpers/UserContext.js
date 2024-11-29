import React, { createContext, useState, useContext } from "react";

const UserContext = createContext({
  user: null,  
  setUserData: () => {}, 
});

// Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Set the user data
  const setUserData = (data) => {
    setUser(data);
  };

  return (
    <UserContext.Provider value={{ user, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the user context
export const useUser = () => {
  return useContext(UserContext);
};
