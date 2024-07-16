import React, { createContext, useContext, useEffect, useState } from "react";
import { ChevronFirst, ChevronLast, MoreVertical } from "lucide-react";
import { UserContext } from "@/context/UserContext";

import Avatar from "react-avatar";
const sidebarContext = createContext();
/**
 * Renders a menu component with a sidebar and user information.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {ReactNode} props.children - The content to be rendered inside the menu.
 * @return {ReactElement} The rendered menu component.
 */
export default function MenuComponent({ children }) {
  const [open, setOpen] = useState(false);
  const { user } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  useEffect(() => {
    setTimeout(() => {
      setName(user.name);
      setEmail(user.email);
    }, 500);
  });
  return (
    <>
      <aside className="h-screen max-w-md fixed">
        <nav className="h-full inline-flex flex-col bg-white border-r shadow-sm">
          <div className="p-4 pb-2 flex justify-between items-center">
            <img
              src="https://img.logoipsum.com/243.svg"
              className={`overflow-hidden transition-all ${
                open ? "w-32" : "w-0"
              }`}
              alt=""
            />
            <button
              onClick={() => setOpen(!open)}
              className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
            >
              {open ? <ChevronFirst /> : <ChevronLast />}
            </button>
          </div>
          <sidebarContext.Provider value={{ open }}>
            <ul className="flex-1 px-3">{children}</ul>
          </sidebarContext.Provider>

          <div className="border-t flex p-3">
            <Avatar name={name} size={40} color="#7986cb" round={"100%"} />
            <div
              className={`
              flex justify-between items-center
              overflow-hidden transition-all ${open ? "w-52 ml-3" : "w-0"}
              `}
            >
              <div className="leading-4">
                <h4 className="font-semibold">{name}</h4>
                <span className="text-gray-600 text-xs">{email} </span>
              </div>
              <MoreVertical size={20} />
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}

/**
 * Renders a single menu item with an icon, text, and optional alert indicator.
 *
 * @param {Object} props - The properties for the menu item.
 * @param {ReactNode} props.icon - The icon to display.
 * @param {string} props.text - The text to display.
 * @param {boolean} props.active - Whether the menu item is active.
 * @param {boolean} props.alert - Whether to display an alert indicator.
 * @return {JSX.Element} The rendered menu item.
 */
export function MenuItem({ icon, text, active, alert }, props) {
  const { open } = useContext(sidebarContext);
  return (
    <li
      className={`relative flex items-center py-2 px-3 my-1
    font-medium rounded-md cursor-pointer
    transition-colors group
    ${
      active
        ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
        : "hover:bg-indigo-50 text-gray-600"
    }`}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          open ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            open ? "" : "top-2"
          }`}
        />
      )}

      {!open && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </li>
  );
}
