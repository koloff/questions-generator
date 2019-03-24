import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Container} from 'semantic-ui-react';

import RootStore from '../stores/RootStore';
import RootRouter from './RootRouter';

@observer
export default class App extends Component {
  render() {
    return (
        <Container>
          <RootRouter/>
        </Container>
    );
  }
}