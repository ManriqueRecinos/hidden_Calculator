import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { isAuthenticated } from '@/utils/auth';

import Home from '@/pages/Home';
import CalculatorPage from '@/pages/CalculatorPage';
import LoginPage from '@/pages/Login';
import RegisterPage from '@/pages/Register';

// Componente para rutas protegidas que requieren autenticación
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      )
    }
  />
);

export default function Routes() {
  return (
    <Switch>
      {/* Rutas públicas */}
      <Route path='/login' component={LoginPage} />
      <Route path='/register' component={RegisterPage} />
      
      {/* Rutas protegidas que requieren autenticación */}
      <PrivateRoute exact path='/' component={Home} />
      <PrivateRoute path='/calculator' component={CalculatorPage} />
      
      {/* Redirección por defecto */}
      <Route path='*'>
        <Redirect to={isAuthenticated() ? '/' : '/login'} />
      </Route>
    </Switch>
  );
}
