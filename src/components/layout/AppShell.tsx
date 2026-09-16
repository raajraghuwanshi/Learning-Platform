import React from 'react';
import { Outlet } from 'react-router-dom';
import { TopNavbar } from './TopNavbar';
import { SearchModal } from '../common/SearchModal';

export const AppShell: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-[#ededed] selection:bg-emerald-700/15 selection:text-emerald-900 dark:selection:text-emerald-300 transition-colors duration-200">
      <TopNavbar />
      <SearchModal />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
    </div>
  );
};
