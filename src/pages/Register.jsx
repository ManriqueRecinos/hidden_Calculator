"use client"

import React, { useState, useEffect } from "react"
import { useHistory, useLocation } from "react-router-dom"
import { register } from "../../services/api"
import { isAuthenticated } from "../utils/auth"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { toast } from "react-toastify"

export default function Register() {
  const history = useHistory()
  const location = useLocation()
  
  const [formData, setFormData] = useState({
    nombre_usuario: "",
    usuario: "",
    correo: "",
    contrasenia: "",
    confirmPassword: "",
  })
  
  // Estados para mostrar/ocultar contraseñas
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  // Función para alternar la visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  
  // Función para alternar la visibilidad de la confirmación de contraseña
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }
  
  // Si ya está autenticado, redirigir a la página principal
  useEffect(() => {
    if (isAuthenticated()) {
      history.replace(location.state?.from || "/")
    }
  }, [])

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    // Validar que las contraseñas coincidan
    if (formData.contrasenia !== formData.confirmPassword) {
      toast.error("Las contraseñas no coinciden")
      setError("Las contraseñas no coinciden")
      return
    }

    setLoading(true)

    try {
      // Llamar a la función de registro de la API
      const data = await register(
        formData.nombre_usuario, // nombre_usuario
        formData.correo, // correo
        formData.usuario, // usuario
        formData.contrasenia, // contraseña
        null // imagen (null por ahora)
      )

      console.log("Usuario creado con ID:", data.id)
      setSuccess(true)
      
      // Mostrar mensaje de éxito con toast y redirigir a login
      toast.success("¡Registro exitoso! Ahora puedes iniciar sesión.")
      history.push("/login")
    } catch (error) {
      console.error("Error en registro:", error)
      
      if (error.response) {
        // Manejar diferentes tipos de error según la respuesta
        switch (error.response.status) {
          case 400:
            if (error.response.data && error.response.data.detail) {
              toast.error(error.response.data.detail)
              setError(error.response.data.detail)
            } else {
              toast.error("Datos de registro inválidos")
              setError("Datos de registro inválidos")
            }
            break
          case 409:
            toast.error("El usuario o correo ya existe")
            setError("El usuario o correo ya existe")
            break
          default:
            toast.error("Error inesperado. Intenta nuevamente")
            setError("Error inesperado. Intenta nuevamente")
        }
      } else {
        toast.error("Error de conexión. Verifica tu conexión a internet")
        setError("Error de conexión. Verifica tu conexión a internet")
      }
    } finally {
      setLoading(false)
    }
  }

  const goToLogin = () => {
    // Navegar a la página de login
    console.log("Navegando a login...")
    history.push('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-6 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Espacio para logo/imagen */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg"></div>
          </div>
        </div>

        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-800 mb-1">Hidden Calculator</h2>
        <p className="text-center text-lg text-gray-600 mb-4">Crea tu cuenta</p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl rounded-xl border border-gray-100">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm font-medium">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-600 text-sm font-medium">
                ¡Cuenta creada exitosamente! Revisa tu correo para verificar tu cuenta. Redirigiendo al login...
              </p>
            </div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="nombre_usuario" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre completo
              </label>
              <input
                id="nombre_usuario"
                name="nombre_usuario"
                type="text"
                autoComplete="name"
                required
                value={formData.nombre_usuario}
                onChange={handleChange}
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent transition-all duration-200"
                placeholder="Tu nombre completo"
              />
            </div>

            <div>
              <label htmlFor="correo" className="block text-sm font-medium text-gray-700 mb-1">
                Correo electrónico
              </label>
              <input
                id="correo"
                name="correo"
                type="email"
                autoComplete="email"
                required
                value={formData.correo}
                onChange={handleChange}
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent transition-all duration-200"
                placeholder="tu@ejemplo.com"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="usuario" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre de usuario
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
                placeholder="Tu nombre de usuario"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="contrasenia" className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="contrasenia"
                  name="contrasenia"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={formData.contrasenia}
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

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirmar contraseña
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent transition-all duration-200"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                </button>
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
                    Creando cuenta...
                  </>
                ) : (
                  "Crear cuenta"
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
                <span className="px-4 bg-white text-gray-500 font-medium">¿Ya tienes cuenta?</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={goToLogin}
                className="w-full flex justify-center py-3 px-4 border-2 border-gray-300 rounded-lg text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 transition-all duration-200"
              >
                Iniciar sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
