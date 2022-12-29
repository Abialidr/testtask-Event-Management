import React, { createContext, useContext, useState } from 'react';

const LocalStorageContext = createContext();

export const LocalStorageProvider = ({ children }) => {
  const [admin, setAdmin] = useState();
  const [id, setId] = useState();
  const [token, setToken] = useState();
  const [logout, setLogout] = useState();
  // const [clientSecret, setClientSecret] = useState();

  const handleAdmin = (data) => {
    setAdmin(data);
    setLogout('1');
  };

  // const handleNav = (data) => setNav(data);
  const handleToken = (data) => setToken(data);
  const handleId = (data) => setId(data);

  const Logout = (data) => {
    setAdmin(null);
    setLogout(null);
    localStorage.removeItem('user');
    setToken(null);
  };
  return (
    <LocalStorageContext.Provider
      value={{
        admin,
        token,
        id,
        handleToken,
        handleAdmin,
        handleId,
        Logout,
      }}
    >
      {children}
    </LocalStorageContext.Provider>
  );
};

export const useLocalStorage = () => useContext(LocalStorageContext);
