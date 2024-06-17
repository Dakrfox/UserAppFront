import React from 'react';


export default function CardComponent({ title, description, image, children, className }) {
    return (
        <div className={`w-full ${className} p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8`}>
        {image && (
          <img
            src={image}
            alt={title}
            className="mb-4 w-52 rounded-md"
          />
        )}
  
        <h2 className="font-bold text-lg mb-2">{title}</h2>
        <p className="text-gray-600 text-xs mb-2">{description}</p>
        {children}
      </div>
    );
}