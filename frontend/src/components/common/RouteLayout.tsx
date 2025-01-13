import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import PrivateRoute from './PrivateRoute';

interface RouteLayoutProps {
  centralComponent: React.ReactNode;
}

const RouteLayout: React.FC<RouteLayoutProps> = ({ centralComponent }) => {
  return (
    <PrivateRoute>
        <div className="min-h-screen flex flex-col">
        {/* Header avec le composant central */}
        <Header centralComponent={centralComponent} />
        
        {/* Contenu principal */}
        <main className="flex-grow bg-gray-100 p-6">
            <Outlet />
        </main>
        </div>
    </PrivateRoute>
  );
};

export default RouteLayout;
