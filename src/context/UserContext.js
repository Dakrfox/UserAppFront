import React from 'react';

const UserContext = React.createContext({
    user: null,
    setUser: (newUser) => {},
  });
export  { UserContext };
