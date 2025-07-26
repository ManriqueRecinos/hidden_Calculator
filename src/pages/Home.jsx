import React, { useEffect, useState } from 'react';
import { FaPaypal } from 'react-icons/fa';
import CustomLink from '@/components/CustomLink';
import Trail from '@/components/animations/Trail';

export default function Home() {
  const [trailOpen, setTrailOpen] = useState(false);

  useEffect(() => {
    // Pequeño retraso para que la animación se vea mejor
    const timer = setTimeout(() => setTrailOpen(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <main>
        <section className='bg-dark'>
          <div className='flex flex-col items-center justify-center min-h-screen text-white layout'>
            <Trail open={trailOpen} className="flex flex-col items-center space-y-6">
              <div>
                <CustomLink href='https://github.com/ManriqueRecinos/hidden_Calculator'>
                  <h1 className="text-4xl md:text-5xl font-bold mb-2">Hidden Calculator</h1>
                </CustomLink>
              </div>
              
              <div className="text-lg md:text-xl">
                <span>By </span>
                <span className='text-primary hover:text-primary-400 font-medium'>
                  Manrique Recinos
                </span>
              </div>
              
              <div className='flex items-center justify-center mt-4'>
                <CustomLink
                  className='text-4xl font-bold text-primary hover:text-[#00457C] flex items-center gap-2 transition-colors duration-300'
                  href='https://paypal.me/manrexjsx'
                >
                  <FaPaypal className="text-4xl" /> 
                  <span>Donaciones</span>
                </CustomLink>
              </div>
            </Trail>
          </div>
        </section>
      </main>
    </>
  );
}
