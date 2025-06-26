// import { createContext, useState, useEffect } from 'react';
// import API from '../api/axios';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   const refreshToken = async () => {
//     try {
//       const res = await API.get('/users/refresh');
//       localStorage.setItem('access_token', res.data.token);
//     } catch {
//       setUser(null);
//     }
//   };

//   useEffect(() => {
//     refreshToken();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, setUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
