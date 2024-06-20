import React, { Children } from "react";

function PrimaryBtn({value ,className,...buttonProps}) {
  /**
 * Renders a primary button component.
 *
 * @param {string} value - The value displayed on the button.
 * @param {string} className - Additional classes for styling.
 * @param {object} buttonProps - Additional properties for the button element.
 * @return {JSX.Element} The primary button component.
 */
  return (
    <button
    {...buttonProps}
      className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${className}`}
    >
      {value}
    </button>
  );
}

function SecondaryBtn({value ,className,...buttonProps}) {
  /** */
  return (
    <button
    {...buttonProps}
      className={`flex w-full justify-center items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ${className}`}
    >
      {value}
    </button>
  );
}


function DangerBtn({value ,className, ...buttonProps}) {
  /** */
  return (
    <button
    {...buttonProps}  
    className={`flex w-full justify-center items-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-red-200 hover:bg-red-700 ${className}`}
    >
      {
      value}
    </button>
  );
}

export { PrimaryBtn, SecondaryBtn, DangerBtn };
