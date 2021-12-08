import React from "react";

export default function CustomButton(props) {
  const { name, disabled, onClick, width } = props;
  return (
    <div class="">
      <button
        class={`${width} h-full mr-5 py-3 text-center text-button rounded-lg  font-bold ${
          disabled ? "bg-gray-100 text-gray-200" : "bg-gray-200 text-gray-500"
        }`}
        type="submit"
        onClick={onClick}
        disabled={disabled}
      >
        {name}
      </button>
    </div>
  );
}
