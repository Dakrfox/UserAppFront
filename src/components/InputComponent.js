import React from "react";


/**
 * Renders an input component with customizable styling and attributes.
 *
 * @param {Object} props - The properties for the input element.
 * @param {string} props.className - Additional classes for styling.
 * @param {string} props.id - The ID of the input element.
 * @param {string} props.type - The type of the input element.
 * @param {string} props.placeholder - The placeholder text for the input element.
 * @param {function} props.onChange - The event handler for the input change event.
 * @param {string} props.value - The value of the input element.
 * @param {boolean} props.disabled - Whether the input element is disabled or not.
 * @return {JSX.Element} The input component.
 */
function InputComponent(props) {
 
  return (
    <>
      <div className="">
        <input
          className={`bg-gray-200
                 appearance-none border-2 
                 border-gray-200 rounded 
                 w-full py-2 px-4 text-gray-700 
                 leading-tight focus:outline-none 
                 focus:bg-white focus:border-purple-500
                 ${props.className}`}
          id={`${props.id}`}
          type={`${props.type}`}
          placeholder={`${props.placeholder}`}
          onChange={props.onChange}
          value={props.value}
          disabled={props.disabled}
        />
      </div>
    </>
  );
}

/**
 * Renders a submit input element with customizable styling and attributes.
 *
 * @param {Object} props - The properties for the input element.
 * @param {string} props.className - Additional classes for styling.
 * @param {string} props.id - The ID of the input element.
 * @param {string} props.value - The value displayed on the input element.
 * @return {JSX.Element} The submit input element.
 */
function InputSubmit(props) {
  return (
    <>
      <div className="">
        <input
          className={`
                flex w-full justify-center rounded-md 
        bg-indigo-600 px-3 py-1.5 text-sm font-semibold 
        leading-6 text-white shadow-sm hover:bg-indigo-500 
        focus-visible:outline focus-visible:outline-2 
        focus-visible:outline-offset-2 focus-visible:outline-indigo-600
        ${props.className}
                `}
          id={`${props.id}`}
          type={`submit`}
          value={`${props.value}`}
        />
      </div>
    </>
  );
}

export { InputComponent };
export { InputSubmit };
