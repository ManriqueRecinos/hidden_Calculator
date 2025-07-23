import React from 'react';

export default function CalculatorPage() {
  return (
    <div className="bg-dark min-h-screen">
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">Calculadora Albion</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Tarjeta para Compra de pieles */}
          <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-105 transition-transform duration-300">
            <div className="p-6">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">Compra de Pieles</h2>
              <p className="text-gray-300 mb-4">Calcula los costos y beneficios de la compra de pieles en el mercado.</p>
              <button className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-md w-full transition-colors duration-300">
                Abrir Calculadora
              </button>
            </div>
          </div>

          {/* Tarjeta para Transmutación */}
          <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-105 transition-transform duration-300">
            <div className="p-6">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">Transmutación</h2>
              <p className="text-gray-300 mb-4">Calcula la rentabilidad de transmutación de materiales.</p>
              <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md w-full transition-colors duration-300">
                Abrir Calculadora
              </button>
            </div>
          </div>

          {/* Tarjeta para Compra de cuero */}
          <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-105 transition-transform duration-300">
            <div className="p-6">
              <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">Compra de Cuero</h2>
              <p className="text-gray-300 mb-4">Calcula los costos y beneficios de la compra de cuero en el mercado.</p>
              <button className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded-md w-full transition-colors duration-300">
                Abrir Calculadora
              </button>
            </div>
          </div>

          {/* Tarjeta para Crateo de cuero */}
          <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-105 transition-transform duration-300">
            <div className="p-6">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">Crateo de Cuero</h2>
              <p className="text-gray-300 mb-4">Calcula la rentabilidad de crear productos de cuero.</p>
              <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md w-full transition-colors duration-300">
                Abrir Calculadora
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
