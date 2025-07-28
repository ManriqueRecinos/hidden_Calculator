// Utilidades para manejo de autenticación

// Tiempo de inactividad en milisegundos (5 minutos)
const INACTIVITY_TIMEOUT = 5 * 60 * 1000;

// Obtener el token de autenticación
export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("access_token")
  }
  return null
}

export const getUserData = () => {
  if (typeof window !== "undefined") {
    const userData = localStorage.getItem("user_data")
    return userData ? JSON.parse(userData) : null
  }
  return null
}

export const logout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("access_token")
    localStorage.removeItem("user_data")
    window.location.href = "/login"
  }
}

// Verificar si el usuario está inactivo
const checkInactivity = () => {
  // Si recordarme está activado, no verificar inactividad
  const rememberMe = localStorage.getItem("remember_me") === "true";
  if (rememberMe) return false;
  
  // Verificar tiempo de inicio de sesión
  const sessionStart = localStorage.getItem("session_start");
  if (!sessionStart) return false;
  
  const now = Date.now();
  const lastActivity = parseInt(sessionStart, 10);
  
  // Si han pasado más de 5 minutos desde la última actividad, el usuario está inactivo
  return (now - lastActivity) > INACTIVITY_TIMEOUT;
};

// Actualizar el tiempo de última actividad
export const updateActivity = () => {
  const rememberMe = localStorage.getItem("remember_me") === "true";
  if (!rememberMe) {
    localStorage.setItem("session_start", Date.now().toString());
  }
};

// Verificar si el usuario está autenticado
export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;

  try {
    // Verificar si el token no ha expirado
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Date.now() / 1000;
    
    // Verificar inactividad
    if (checkInactivity()) {
      console.log("Sesión expirada por inactividad");
      logout();
      return false;
    }
    
    return payload.exp > currentTime;
  } catch (error) {
    return false;
  }
}

// Función para hacer peticiones autenticadas
export const authenticatedFetch = async (url, options = {}) => {
  const token = getToken()

  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  }

  const response = await fetch(url, defaultOptions)

  // Si el token expiró, redirigir al login
  if (response.status === 401) {
    logout()
    return
  }

  return response
}
