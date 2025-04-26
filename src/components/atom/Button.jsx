import React from 'react'

function Button({ onClick, isActive, children }) {
    return (
      <button
        className={`mb-4 font-bold w-auto max-w-xs px-3 py-1 border rounded shadow-md hover:shadow-lg active:translate-y-[1px] active:shadow-sm transition-all text-center
        ${isActive ? "bg-blue-700 text-white" : "bg-blue-500 text-white hover:bg-blue-600"}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
  
  export default Button;
  