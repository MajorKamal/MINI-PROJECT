import React from 'react';
import { Bus, Search, User, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  showSearch?: boolean;
  onSearch?: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ showSearch = false, onSearch }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearch) {
      onSearch(e.target.value);
    }
  };
  
  return (
    <header className="bg-primary-500 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <Bus size={28} className="text-accent-500" />
            <span className="text-xl font-heading font-bold">Kolkata Bus</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            {showSearch && (
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Search bus routes..."
                  className="py-1 pl-8 pr-3 rounded-full text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500 w-48 lg:w-64"
                  onChange={handleSearchChange}
                />
                <Search size={16} className="absolute left-2.5 top-2 text-gray-500" />
              </div>
            )}
            
            <div className="flex items-center space-x-1">
              <span className="hidden md:inline text-sm font-medium">{user?.username}</span>
              <User size={20} className="text-white" />
            </div>
            
            <button 
              onClick={handleLogout}
              className="p-1 rounded-full hover:bg-primary-600 transition-colors"
              aria-label="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
        
        {showSearch && (
          <div className="mt-3 md:hidden">
            <div className="relative">
              <input
                type="text"
                placeholder="Search bus routes..."
                className="w-full py-2 pl-9 pr-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-accent-500"
                onChange={handleSearchChange}
              />
              <Search size={18} className="absolute left-3 top-2.5 text-gray-500" />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;