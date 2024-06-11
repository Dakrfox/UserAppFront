import React from 'react';


export default function ContainerComponent(props) {
    return (<div className={`lex min-h-full flex-col justify-center px-6 py-12 lg:px-8 ${props.className}`}>
        {props.children}
    </div>);
}