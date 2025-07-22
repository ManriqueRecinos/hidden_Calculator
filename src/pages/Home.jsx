import React from 'react';

import CustomLink from '@/components/CustomLink';

export default function Home() {
  return (
    <>
      <main>
        <section className='bg-dark'>
          <div className='flex flex-col items-center justify-center min-h-screen text-white layout'>
            <CustomLink href='https://github.com/theodorusclarence/vite-react-tailwind-starter'>
              <h1>Hidden Calculator</h1>
            </CustomLink>
            <p className='mb-4'>
              By{' '}
              <CustomLink href='https://theodorusclarence.com'>
                Manrique Recinos
              </CustomLink>
            </p>

          </div>
        </section>
      </main>
    </>
  );
}
