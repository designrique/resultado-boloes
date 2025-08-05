
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
           <h1 className="text-xl md:text-2xl font-bold text-brand-primary">Gerador de Posts</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;