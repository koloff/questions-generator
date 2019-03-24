import React from 'react'
import RootStore from '../../stores/RootStore';
import {inject, observer} from 'mobx-react';
import {RouteComponentProps} from 'react-router-dom';
import {Button, Divider, Form, Grid, Header, Icon, Input, Segment, TextArea} from 'semantic-ui-react';
import GenerationStore from '../../stores/GenerationStore';
import NextButton from './NextButton';

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
      <Input
        onChange={(event: any, data: any) => {
          this.generationStore.inputs.url = data.value;
        }}
        fluid size={'huge'} icon='linkify' iconPosition='left' placeholder='Resource link'/>
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
      <Form>
        <TextArea
          placeholder='Paste the text here'
          onChange={(event: any, data: any) => {
            this.generationStore.inputs.text = data.value;
          }}/>
      </Form>
    </>
  }

  async onNextPress() {
    let nextKey = GenerationStore.generationSteps[1].key;

    if (this.generationStore.finishedSteps.has(this.stepInfo.key)) {
      this.generationStore.setActiveStep(nextKey);
      return this.props.history.push(`${nextKey}`);
    }

    await this.generationStore.generateQuestions();
    this.generationStore.finishStep(GenerationStore.generationSteps[0].key);
    this.generationStore.finishStep(GenerationStore.generationSteps[1].key);
    return this.props.history.push(`${nextKey}`);
  };

  render() {

    const isNextDisabled = () => {
      if (this.generationStore.finishedSteps.has(this.stepInfo.key)) {
        return false;
      }
      if (this.generationStore.selectedTextInputOption === 'url') {
        return !this.generationStore.inputs.url
      }
      if (this.generationStore.selectedTextInputOption === 'text') {
        return !this.generationStore.inputs.text
      }
      return true;
    };


    return <>
      <Segment loading={this.generationStore.loading} secondary textAlign={'center'}>
        <Button.Group widths={2} size={'huge'}>
          <Button
            primary={this.generationStore.selectedTextInputOption === 'url'}
            onClick={() => {
              this.generationStore.selectedTextInputOption = 'url';
            }}
          >
            URL
          </Button>
          <Button.Or/>
          <Button
            primary={this.generationStore.selectedTextInputOption === 'text'}
            onClick={() => {
              this.generationStore.selectedTextInputOption = 'text';
            }}
          >Plain Text
          </Button>
        </Button.Group>

        {
          this.generationStore.selectedTextInputOption === 'url'
            ? this.renderURLOption()
            : this.renderTextOption()
        }

      </Segment>
      <Divider hidden/>
      <NextButton loading={this.generationStore.loading} onClick={this.onNextPress.bind(this)} disabled={isNextDisabled()}/>
    </>
  }
}