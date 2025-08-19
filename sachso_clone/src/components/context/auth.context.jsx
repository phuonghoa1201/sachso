import React, { createContext, useState } from "react";

// Tạo context
export const AuthContext = createContext({
  isAuthenticated: false,
  user: { name: "", email: "", phone: ""},
});

// Wrapper để bọc app
export const AuthWrapper = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: { name: "", email: "", phone: ""},
  });
 
  const [appLoading, setAppLoading] = useState(true)
  return (
    <AuthContext.Provider value={{ auth, setAuth, appLoading, setAppLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
