import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Calendar, 
  Map, 
  Package, 
  DollarSign, 
  Cloud, 
  Camera, 
  CreditCard 
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  const menuItems = [
    { to: '/', icon: Home, label: 'Dashboard' },
    { to: '/trip-planner', icon: Calendar, label: 'Trip Planner' },
    { to: '/map', icon: Map, label: 'World Map' },
    { to: '/packing', icon: Package, label: 'Packing List' },
    { to: '/budget', icon: DollarSign, label: 'Budget' },
    { to: '/weather', icon: Cloud, label: 'Weather' },
    { to: '/photos', icon: Camera, label: 'Photo Journal' },
    { to: '/currency', icon: CreditCard, label: 'Currency' }
  ];

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => 
              `sidebar-link ${isActive ? 'active' : ''}`
            }
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;