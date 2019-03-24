import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Container, Header, Icon} from 'semantic-ui-react';

import RootStore from '../stores/RootStore';
import RootRouter from './RootRouter';

@observer
export default class App extends Component {
  render() {
    return (
        <Container style={{paddingTop: 37}}>
          <Header as='h2' icon textAlign='center' inverted>
            <Icon name='question' />
          </Header>
          <RootRouter/>
        </Container>
    );
  }
}