import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from '@/routes/Routes';
import Layout from '@/components/Layout';


export default function App() {
  return (
    <Router>
      <Layout>
        <Routes />
      </Layout>
    </Router>
  );
}
