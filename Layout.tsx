
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Chatbot from './components/Chatbot';

interface LayoutProps {
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ onLogout }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar onLogout={onLogout} />
      <div className="flex-1 overflow-auto">
        <main className="min-h-full p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
      <Chatbot />
    </div>
  );
};

export default Layout;
