import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-blue-500 p-4 sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-2xl font-semibold">
          <a href="#">RC Project</a>
        </div>

        {/* Links */}
        {/* <div className={`lg:flex space-x-6 ${isMenuOpen ? 'block' : 'hidden'} lg:block`}>
          <ul className="flex space-x-6 text-white">
            <li> */}
        <button className="bg-gradient-to-b from-blue-200 to-blue-400 px-1 py-1 rounded-lg shadow-[inset_0_-2px_0_0_rgba(0,0,0,0.2),0_4px_6px_rgba(0,0,0,0.3)] transform hover:translate-y-[2px] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6),0_1px_2px_rgba(0,0,0,0.2)] transition">
          <a
            href="https://ridhochaniago.web.app"
            target="_blank"
            className="font-bold text-blue-700 text-xl"
          >
            🧑‍💻
          </a>
        </button>

        {/* </li>
          </ul>
        </div> */}

        {/* Hamburger Icon for Mobile */}
        {/* <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-white text-2xl">
            {isMenuOpen ? 'X' : '☰'}
          </button>
        </div> */}
      </div>
    </nav>
  );
};

export default Navbar;
