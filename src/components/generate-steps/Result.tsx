import React from 'react'
import RootStore from '../../stores/RootStore';
import {inject, observer} from 'mobx-react';
import {RouteComponentProps} from 'react-router-dom';
import {Button, Divider, Header, Icon, List, Segment} from 'semantic-ui-react';
import GenerationStore from '../../stores/GenerationStore';

interface Props extends RouteComponentProps {
  rootStore: RootStore
}

@inject((root: any) => ({
  rootStore: root.store as RootStore
}))
@observer
export default class Result extends React.Component<Props> {
  private generationStore: GenerationStore;
  private stepInfo: { url: string; key: string; icon: string; title: string; description: string };

  constructor(props: any) {
    super(props);
    this.generationStore = this.props.rootStore.generationStore;
    this.stepInfo = GenerationStore.generationSteps[1];
  }

  render() {
    return <Segment
      // disabled={this.generationStore.finishedSteps.has(this.stepInfo.key)}
      placeholder
    >
      {
        this.generationStore.questions.map((question: any) => <Segment>
          <Header as={'h5'}>{question.text.replace(question.answers[0].correct, '  ________  ')}</Header>
          <Divider hidden />
          <List as={'ol'}>
            {
              question.answers[0].distractors
              && question.answers[0].distractors.map((distraction: string, index: number) =>
                <List.Item
                  key={index}
                  as={'li'}>
                  {distraction}
                </List.Item>)
            }
          </List>
          CORRECT: <strong> {question.answers[0].correct}</strong>
        </Segment>)
      }
    </Segment>
  }
}