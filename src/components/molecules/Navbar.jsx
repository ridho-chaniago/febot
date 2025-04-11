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
        <div className={`lg:flex space-x-6 ${isMenuOpen ? 'block' : 'hidden'} lg:block`}>
          <ul className="flex space-x-6 text-white">
            <li><button className='bg-white px-4 py-2 rounded-lg hover:bg-gray-300'>
              <a href="https://ridhochaniago.web.app" target='_blank' className='font-bold  text-blue-600 '>A little bit about me</a>
              </button>
              </li>
          </ul>
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-white text-2xl">
            {isMenuOpen ? 'X' : '☰'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
