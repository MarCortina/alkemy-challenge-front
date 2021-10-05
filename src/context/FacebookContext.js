// import React, { useState } from "react";

// const Context = React.createContext({});

// export const FacebookContextProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userID, setUserID] = useState({});

//   const login = (userId) => {
//     setIsLoggedIn(true);
//     setUserID(userID);
//   };

//   const logout = () => {
//     setIsLoggedIn(false);
//     setUserID({});
//   };

//   return (
//     <Context.Provider value={{ isLoggedIn, userID, login, logout }}>
//       {children}
//     </Context.Provider>
//   );
// };

// export default Context;
