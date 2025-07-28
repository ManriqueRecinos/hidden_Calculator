import React from 'react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '@/index.css';
import App from '@/App';

ReactDOM.render(
  <React.StrictMode>
    <Helmet
      defaultTitle='Hidden Calculator'
      titleTemplate='%s | Hidden Calculator'
    >
      <meta charSet='utf-8' />
      <html lang='id' amp />
    </Helmet>
    <App />
    <ToastContainer 
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  </React.StrictMode>,
  document.getElementById('root')
);
