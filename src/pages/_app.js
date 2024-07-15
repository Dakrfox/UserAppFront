import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import "tailwindcss/tailwind.css";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}
