import axios from 'axios';

const API_BASE_URL = 'https://api-hidden-calculator.onrender.com/';

export const login = async (usuario, contrasenia) => {
  try {
    const response = await axios.post(`${API_BASE_URL}usuarios/login`, {
      usuario: usuario,
      contrasenia: contrasenia,
    });
    return response.data;
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    throw error;
  }
};

export const register = async (nombre_usuario, correo, usuario, contrasenia, imagen) => {
  try {
    const response = await axios.post(`${API_BASE_URL}usuarios/crear`, {
      nombre_usuario: nombre_usuario,
      correo: correo,
      usuario: usuario,
      contrasenia: contrasenia,
      imagen: null
    });
    return response.data;
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    throw error;
  }
};


