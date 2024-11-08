import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/auth/useAuth';
import { useNavigate } from 'react-router-dom';
import { Roles } from '../../interfaces/auth/Roles';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, role } = useAuth();

  const links = [
    { to: '/', label: 'Home' },
    { to: '/transactions', label: 'Transações', isPrivate: true },
    { to: '/admin', label: 'Admin', isPrivate: true, roles: [Roles.ADMIN] },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const renderLinks = () => links.map(link => {
    const isUnauthorized = link.roles && (role && !link.roles.includes(role));

    if (link.isPrivate && (!isAuthenticated || isUnauthorized)) return null;

    return (
      <Link key={link.to} to={link.to} className="mx-2 hover:underline">
        {link.label}
      </Link>
    );
  })

  return (
    <header className="bg-blue-600 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link to="/">Transações App</Link>
        </h1>

        <div className='flex justify-between'>
          <div>
            {renderLinks()}
          </div>

          <div className='ml-8'>
            {isAuthenticated ? (
              <button onClick={handleLogout} className="hover:underline">
                Logout
              </button>
            ) : (
              <Link to='/login' className="mx-2 hover:underline">
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
