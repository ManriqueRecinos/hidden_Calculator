"use client"

import React, { useState, useEffect } from "react"
import { useHistory, useLocation } from "react-router-dom"
import { login } from "../../services/api"
import { isAuthenticated } from "../utils/auth"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Login() {
  const history = useHistory()
  const location = useLocation()
  const [formData, setFormData] = useState({
    usuario: "",
    password: "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  
  // Si ya está autenticado, redirigir a la página principal
  useEffect(() => {
    if (isAuthenticated()) {
      history.replace(location.state?.from || "/")
    }
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const data = await login(formData.usuario, formData.password)
      
      // Guardar token en localStorage junto con la preferencia de recordar
      localStorage.setItem("access_token", data.access_token)
      localStorage.setItem("user_data", JSON.stringify(data.usuario))
      localStorage.setItem("remember_me", rememberMe.toString())
      
      // Si recordarme no está activado, establecer tiempo de inicio de sesión
      if (!rememberMe) {
        localStorage.setItem("session_start", Date.now().toString())
      }

      console.log("Login exitoso:", data)

      // Mostrar mensaje de éxito con toast
      toast.success("¡Inicio de sesión exitoso!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      })
      
      // Redirigir a la página principal o a la página desde donde fue redirigido
      setTimeout(() => {
        history.replace(location.state?.from || "/")
      }, 1000)
    } catch (error) {
      console.error("Error en login:", error)
      
      if (error.response) {
        // El servidor respondió con un código de estado diferente de 2xx
        let errorMsg = "";
        switch (error.response.status) {
          case 401:
            errorMsg = "Credenciales inválidas o cuenta no verificada";
            break
          case 400:
            errorMsg = "Se requiere nombre de usuario y contraseña";
            break
          default:
            errorMsg = "Error inesperado. Intenta nuevamente";
        }
        setError(errorMsg);
        toast.error(errorMsg, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
      } else {
        const errorMsg = "Error de conexión. Verifica tu conexión a internet";
        setError(errorMsg);
        toast.error(errorMsg, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
      }
    } finally {
      setLoading(false)
    }
  }

  const goToRegister = () => {
    // Navegar a la página de registro
    console.log("Navegando a register...")
    window.location.href = '/register'
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Espacio para logo/imagen */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg"></div>
          </div>
        </div>

        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-800 mb-2">Hidden Calculator</h2>
        <p className="text-center text-lg text-gray-600 mb-8">Inicia sesión en tu cuenta</p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl rounded-xl border border-gray-100">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm font-medium">{error}</p>
            </div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="usuario" className="block text-sm font-semibold text-gray-700 mb-2">
                Usuario
              </label>
              <input
                id="usuario"
                name="usuario"
                type="text"
                autoComplete="username"
                required
                value={formData.usuario}
                onChange={handleChange}
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent transition-all duration-200"
                placeholder="Ej: Pedrito_Tactico"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent transition-all duration-200"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                  onClick={togglePasswordVisibility}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-gray-700 focus:ring-gray-600 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">
                  Recordarme
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-gray-700 hover:text-gray-800 transition-colors duration-200">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
                  }`}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Iniciando sesión...
                  </>
                ) : (
                  "Iniciar sesión"
                )}
              </button>
            </div>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">¿No tienes cuenta?</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={goToRegister}
                className="w-full flex justify-center py-3 px-4 border-2 border-gray-300 rounded-lg text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 transition-all duration-200"
              >
                Crear cuenta nueva
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
