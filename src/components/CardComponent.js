import React from "react";

/**
 * Renders a card component with a title, description, image, and children.
 *
 * @param {Object} props - The properties for the card component.
 * @param {string} props.title - The title of the card.
 * @param {string} props.description - The description of the card.
 * @param {string} props.image - The URL of the image to display in the card.
 * @param {ReactNode} props.children - The content to display inside the card.
 * @param {string} props.className - Additional CSS classes to apply to the card.
 * @return {ReactElement} The rendered card component.
 */
export default function CardComponent({
  title,
  description,
  image,
  children,
  className,
}) {
  return (
    <div
      className={`w-full ${className} p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 lg:pt-6 lg:px-10`}
    >
      {image && (
        <img src={image} alt={title} className="mb-4 w-52 rounded-md" />
      )}

      <h2 className="font-bold text-lg mb-2">{title}</h2>
      {children}
    </div>
  );
}
