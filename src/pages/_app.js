import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import "tailwindcss/tailwind.css";
import "../styles/globals.css";

/**
 * Renders the main application component.
 *
 * @param {Object} props - The properties object.
 * @param {React.Component} props.Component - The component to render.
 * @param {Object} props.pageProps - The props to pass to the component.
 * @return {React.Element} The rendered application component.
 */
export default function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}
