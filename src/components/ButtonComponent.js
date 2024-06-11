import React from 'react';

function PrimaryBtn(props) {
    /** */
    return (
        <button className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${props.className}`}>{props.value}</button>
    );
}
function SecondaryBtn(props) {
    /** */
    return (
        <button className={`flex w-full justify-center items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ${props.className}`}>{props.value}</button>
    );
}


export { PrimaryBtn, SecondaryBtn }