import React from 'react'
import RootStore from '../../stores/RootStore';
import {inject, observer} from 'mobx-react';
import {RouteComponentProps} from 'react-router-dom';
import {Button, Header, Icon, Segment} from 'semantic-ui-react';
import GenerationStore from '../../stores/GenerationStore';

interface Props extends RouteComponentProps {
  rootStore: RootStore
}

@inject((root: any) => ({
  rootStore: root.store as RootStore
}))
@observer
export default class Options extends React.Component<Props> {
  private generationStore: GenerationStore;
  private stepInfo: { url: string; key: string; icon: string; title: string; description: string };

  constructor(props: any) {
    super(props);
    this.generationStore = this.props.rootStore.generationStore;
    this.stepInfo = GenerationStore.generationSteps[1];
  }

  render() {
    return <Segment
      disabled={this.generationStore.finishedSteps.has(this.stepInfo.key)}
      placeholder
    >
      <Header icon>
        <Icon name='file pdf'/>
        parameteres
      </Header>
      <Button primary>Parameters</Button>
    </Segment>
  }
}