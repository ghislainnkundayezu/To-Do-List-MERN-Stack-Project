// import React, { createContext, useState, useContext, FC, ReactNode } from 'react';

// interface AuthContextProps {
//     token: string;
//     updateToken: (newToken: string) => null;
// }

// // Create the AuthContext
// export const AuthContext = createContext<AuthContextProps | null>(null);

// // AuthProvider component to wrap your app
// export const AuthProvider: FC<{children: ReactNode}> = ({ children }) => {
//   const [token, setToken] = useState('');
//   const updateToken = (newToken: string) => {
//     setToken(token);
//   }
//   return (
//     <AuthContext.Provider value={{ token, updateToken }}>
//        { children }
//     </AuthContext.Provider>
//   );
// };

// // Custom hook to access the authentication context
// export const useAuth = () => useContext(AuthContext);
