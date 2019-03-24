import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import StepsContainer from './generate-steps/StepsContainer';

export default function RootRouter() {
  return <Router>
    <Route path={'/generate'} component={StepsContainer} />
  </Router>
}