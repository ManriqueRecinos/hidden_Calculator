import React, { useEffect } from 'react';
import { updateActivity } from '../utils/auth';

// Componente para rastrear la actividad del usuario y actualizar el tiempo de última actividad
const ActivityTracker = () => {
  useEffect(() => {
    // Lista de eventos a monitorear para detectar actividad del usuario
    const events = [
      'mousedown',
      'mousemove',
      'keypress',
      'scroll',
      'touchstart',
      'click'
    ];

    // Función para actualizar el tiempo de actividad
    const handleActivity = () => {
      updateActivity();
    };

    // Registrar los eventos
    events.forEach(event => {
      window.addEventListener(event, handleActivity);
    });

    // Actualizar actividad al montar el componente
    updateActivity();

    // Limpiar los event listeners al desmontar el componente
    return () => {
      events.forEach(event => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, []);

  // Este componente no renderiza nada visible
  return null;
};

export default ActivityTracker;
