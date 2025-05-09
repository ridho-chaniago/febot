import React from 'react'

function Button({ onClick, isActive, children }) {
    return (
      <button
        className={`bg-gradient-to-b from-blue-400 to-blue-500 px-2 w-[74px] mb-4 py-2 text-xs rounded-lg shadow-[inset_0_-2px_0_0_rgba(0,0,0,0.2),0_4px_6px_rgba(0,0,0,0.3)] transform hover:translate-y-[1px] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6),0_1px_2px_rgba(0,0,0,0.2)] transition
        ${isActive ? "bg-blue-700 text-white" : "bg-blue-500 text-white hover:bg-blue-600"}`}
        onClick={onClick}
      >
        {/* <button className="bg-gradient-to-b from-blue-200 to-blue-400 px-1 py-1 rounded-lg shadow-[inset_0_-2px_0_0_rgba(0,0,0,0.2),0_4px_6px_rgba(0,0,0,0.3)] transform hover:translate-y-[2px] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6),0_1px_2px_rgba(0,0,0,0.2)] transition"> */}

        {children}
      </button>
    );
  }
  
  export default Button;
  