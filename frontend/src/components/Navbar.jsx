import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, Leaf, Menu } from 'lucide-react';

const Navbar = ({ onMenuToggle }) => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex justify-between items-center sticky top-0 z-20">
      <div className="flex items-center gap-2">
        {user && (
          <button onClick={onMenuToggle} className="md:hidden p-1 -ml-1 text-gray-500 hover:text-gray-700">
            <Menu className="w-6 h-6" />
          </button>
        )}
        <div className="flex items-center gap-2 text-emerald-600">
          <Leaf className="w-6 h-6" />
          <span className="font-bold text-xl tracking-tight text-gray-900 hidden sm:block">CarbonSense</span>
        </div>
      </div>
      
      {user && (
        <div className="flex items-center gap-3 sm:gap-6">
          <div className="flex flex-col items-end">
            <span className="text-sm font-medium text-gray-900 hidden sm:block">{user.email}</span>
            <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-full">
              {user.role === 'owner' ? 'Owner' : 'Officer'}
            </span>
          </div>
          <button 
            onClick={logout}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
