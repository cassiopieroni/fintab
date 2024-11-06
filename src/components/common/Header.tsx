import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/auth/useAuth';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const links = [
    { to: '/', label: 'Home' },
    { to: '/transactions', label: 'Transações', isPrivate: true },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-blue-600 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link to="/">Transações App</Link>
        </h1>

        <div className='flex justify-between'>
          <div>
            {links.map(link => link.isPrivate && !isAuthenticated ? null : (
              <Link key={link.to} to={link.to} className="mx-2 hover:underline">
                {link.label}
              </Link>
            ))}
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
