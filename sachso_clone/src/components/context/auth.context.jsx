import React, { createContext, useState } from "react";


export const AuthContext = createContext({
  isAuthenticated: false,
  user: { email: "", name: "" },
 
});
// tạo cái wrapper coi thằng coi nào sẽ kế thừa data này
export const AuthWrapper = (props) => {
  // State đăng nhập
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: { email: "", name: "" },
  });


  return (
    <AuthContext.Provider value={{auth, setAuth}}
    >
      {props.children}
    </AuthContext.Provider>
  );
};