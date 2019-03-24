import React from 'react'
import RootStore from '../../stores/RootStore';
import {inject, observer} from 'mobx-react';
import {RouteComponentProps} from 'react-router-dom';
import {Button, Divider, Form, Grid, Header, Icon, Input, Segment, TextArea} from 'semantic-ui-react';
import GenerationStore from '../../stores/GenerationStore';

interface Props extends RouteComponentProps {
  rootStore: RootStore
}

@inject((root: any) => ({
  rootStore: root.store as RootStore
}))
@observer
export default class AddText extends React.Component<Props> {
  private generationStore: GenerationStore;
  private stepInfo: { url: string; key: string; icon: string; title: string; description: string };

  state = {
    selectedOption: 'url',
    url: '',
    text: ''
  };

  constructor(props: any) {
    super(props);
    this.generationStore = this.props.rootStore.generationStore;
    this.stepInfo = GenerationStore.generationSteps[0];
  }

  renderURLOption() {
    return <>
      <Header as='h2' icon>
        <Icon name='globe'/>
        Resource URL
        <Header.Subheader>Just link the resource below and the system will extract the text</Header.Subheader>
      </Header>
      <Divider hidden/>
      <Input onChange={(event, data) => {
        this.setState({url: data})
      }} fluid size={'huge'} icon='linkify' iconPosition='left' placeholder='Resource link'/>
    </>
  }

  renderTextOption() {
    return <>
      <Header as='h2' icon>
        <Icon name='copy'/>
        Plain text
        <Header.Subheader>Paste the whole resource here and we will take care of it</Header.Subheader>
      </Header>
      <Divider hidden/>
      <Form  onChange={(event, data) => {
        this.setState({url: data})
      }}>
        <TextArea placeholder='Paste the text here'/>
      </Form>
    </>
  }

  render() {
    return <Segment secondary textAlign={'center'}>
      <Button.Group widths={2} size={'huge'}>
        <Button
          primary={this.state.selectedOption === 'url'}
          onClick={() => {
            this.setState({selectedOption: 'url'})
          }}
        >
          URL
        </Button>
        <Button.Or/>
        <Button
          primary={this.state.selectedOption === 'text'}
          onClick={() => {
            this.setState({selectedOption: 'text'})
          }}
        >Plain Text
        </Button>
      </Button.Group>

      {
        this.state.selectedOption === 'url'
          ? this.renderURLOption()
          : this.renderTextOption()
      }


    </Segment>
  }
}