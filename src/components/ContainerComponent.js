import React from "react";

/**
 * Renders a container component with flexbox layout.
 *
 * @param {Object} props - The properties for the container component.
 * @param {string} props.className - The additional CSS class name for the container.
 * @param {ReactNode} props.children - The child elements to be rendered inside the container.
 * @return {ReactElement} The container component.
 */
export default function ContainerComponent(props) {
  return (
    <div
      className={`flex min-h-full flex-col justify-center ${props.className}`}
    >
      {props.children}
    </div>
  );
}
