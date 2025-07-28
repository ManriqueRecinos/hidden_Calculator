import React from 'react';
import Sidebar from './Sidebar';
import { useLocation } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';
import ActivityTracker from './ActivityTracker';

export default function Layout({ children }) {
  const location = useLocation();
  const authenticated = isAuthenticated();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  
  // Si es una página de autenticación (login/register) o el usuario no está autenticado
  if (isAuthPage || !authenticated) {
    return (
      <div className="flex h-screen bg-gray-100">
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    );
  }
  
  // Si el usuario está autenticado y no es una página de autenticación
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Componente para rastrear actividad del usuario */}
      <ActivityTracker />
      
      {/* Sidebar solo se muestra si el usuario está autenticado */}
      <Sidebar />

      {/* Contenido principal */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
}
