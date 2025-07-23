import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '@/pages/Home';
import CalculatorPage from '@/pages/CalculatorPage';

export default function Routes() {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/calculator' component={CalculatorPage} />
    </Switch>
  );
}
