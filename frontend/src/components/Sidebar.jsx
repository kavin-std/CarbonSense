import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { LayoutDashboard, PlusCircle, Factory } from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const { getFactoryByOwner } = useData();

  const userFactory = user?.role === 'owner' ? getFactoryByOwner(user.email) : null;

  const navItems = [];
  
  if (user?.role === 'owner') {
    navItems.push({ path: '/factory-dashboard', label: 'Dashboard', icon: LayoutDashboard });
    if (!userFactory) {
      navItems.push({ path: '/create-factory', label: 'Create Factory', icon: PlusCircle });
    }
  } else if (user?.role === 'officer') {
    navItems.push({ path: '/officer-dashboard', label: 'Overview', icon: LayoutDashboard });
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-20 md:hidden"
          onClick={onClose}
        />
      )}
      
      <aside className={`
        fixed md:sticky top-[65px] left-0 z-30
        w-64 bg-white border-r border-gray-200 h-[calc(100vh-65px)] flex flex-col
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-4 flex-1 overflow-y-auto">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive 
                          ? 'bg-emerald-50 text-emerald-700' 
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`
                    }
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="p-4 border-t border-gray-100">
          <div className="bg-gray-50 rounded-lg p-4 flex items-start gap-3">
            <Factory className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-medium text-gray-900">Carbon Monitoring</p>
              <p className="text-xs text-gray-500 mt-1">Real-time emission tracking system.</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
