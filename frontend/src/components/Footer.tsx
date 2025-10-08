import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white shadow-md w-full fixed bottom-0 left-0">
      <div className="container mx-auto px-4 py-3">
        <p className="text-sm text-gray-600 text-center">
          &copy; {new Date().getFullYear()} Spec-Kit. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;