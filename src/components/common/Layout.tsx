import React from 'react';
import Header from './Header';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">{children}</div>
    </div>
  );
};

export default Layout;
