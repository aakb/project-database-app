import React from 'react';

function Footer({ children }) {

  return (
    <footer className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        { children }
      </div>
    </footer>
  );
}

export default Footer;