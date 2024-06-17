import React, { createContext, useContext, useState } from "react";
import { ChevronFirst, ChevronLast, MoreVertical } from "lucide-react";
const sidebarContext = createContext();
export default function MenuComponent({ children }) {
  const [open, setOpen] = useState(false);
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
          <sidebarContext.Provider value={{open}}>
            <ul className="flex-1 px-3">{children}</ul>
          </sidebarContext.Provider>

          <div className="border-t flex p-3">
            <img src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true" 
            className="w-10 h-10 rounded-md" />
            <div
              className={`
              flex justify-between items-center
              overflow-hidden transition-all ${open ? "w-52 ml-3" : "w-0"}
              `}
            >
              <div className="leading-4">
                <h4 className="font-semibold">Jhon Doe</h4>
                <span className="text-gray-600 text-xs">jd@gmail.com </span>
              </div>
              <MoreVertical size={20} />
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}

export function MenuItem({ icon, text, active, alert }) {
  const {open} = useContext(sidebarContext)
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
      <span className={`overflow-hidden transition-all ${open ? "w-52 ml-3" : "w-0"}`}>{text}</span>
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
