import React, { createContext, useState } from 'react';

const MyContext = createContext();

const MyProvider = ({ children }) => {
    const [isLogged, setIsLogged] = useState(false);
  
    return (
      <MyContext.Provider value={{ isLogged, setIsLogged }}>
        {children}
      </MyContext.Provider>
    );
  };
  
  export { MyContext, MyProvider };