import React, { createContext, useState } from 'react';

const MyContext = createContext();

const MyProvider = ({ children }) => {
    const [user, setUser] = useState(
      {
        isLogged: false,
        username: '',
        token: '',
        roles: {
          default_user: true,
        }
      }
    );
  
    return (
      <MyContext.Provider value={{ user, setUser }}>
        {children}
      </MyContext.Provider>
    );
  };
  
  export { MyContext, MyProvider };