import React from 'react';


export default function CardComponent({ title, description, image }) {
    return (
        <div className="bg-white rounded-lg p-5 shadow-md border border-gray-200 m-10">
        {image && (
          <img
            src={image}
            alt={title}
            className="mb-4 w-52 rounded-md"
          />
        )}
  
        <h2 className="font-bold text-lg mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
    );
}