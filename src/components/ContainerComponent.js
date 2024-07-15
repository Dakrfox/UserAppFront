import React from "react";

export default function ContainerComponent(props) {
  return (
    <div
      className={`flex min-h-full flex-col justify-center ${props.className}`}
    >
      {props.children}
    </div>
  );
}
