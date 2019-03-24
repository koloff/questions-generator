import React from 'react'
import RootStore from '../../stores/RootStore';
import {inject, observer} from 'mobx-react';
import {RouteComponentProps} from 'react-router-dom';
import {Button, Header, Icon, Segment} from 'semantic-ui-react';

interface Props extends RouteComponentProps {
  rootStore: RootStore
}

@inject((root: any) => ({
  rootStore: root.store.rootStore as RootStore
}))
@observer
export default class AddText extends React.Component<Props> {
  render() {
    return <Segment placeholder>
      <Header icon>
        <Icon name='file pdf outline'/>
        No documents are listed for this customer.
      </Header>
      <Button primary>Add Document</Button>
    </Segment>
  }
}