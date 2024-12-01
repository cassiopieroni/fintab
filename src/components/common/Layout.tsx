import React from 'react';
import Header from './Header';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-screen h-screen flex flex-col">
      <Header />
      <div className='flex-grow'>
        {children}
      </div>
    </div>
  );
};

export default Layout;
