import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/auth/useAuth';
import { useNavigate } from 'react-router-dom';
import { Roles } from '../../interfaces/auth/Roles';
import { AplicationRoutes } from '@/routes/routes.enum';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, role } = useAuth();

  const links = [
    { to: AplicationRoutes.HOME, label: 'Home' },
    { to: AplicationRoutes.TRANSACTIONS, label: 'Transações', isPrivate: true },
    { to: AplicationRoutes.ADMIN, label: 'Admin', isPrivate: true, roles: [Roles.ADMIN] },
  ];

  const handleLogout = () => {
    logout();
    navigate(AplicationRoutes.HOME);
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
    <header className="bg-primary text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link to={AplicationRoutes.HOME}>Transações App</Link>
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
              <Link to={AplicationRoutes.LOGIN} className="mx-2 hover:underline">
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
