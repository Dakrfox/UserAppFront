import React from "react";

function InputComponent(props) {
  /**inputs for
   * Text
   * Email
   * Password
   * Number
   *  Date
   */
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
