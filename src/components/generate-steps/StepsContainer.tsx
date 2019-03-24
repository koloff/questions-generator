import React from 'react'
import {Step} from 'semantic-ui-react'
import RootStore from '../../stores/RootStore';
import {inject, observer} from 'mobx-react';
import {Route, RouteComponentProps} from 'react-router-dom';

import AddText from './AddText';
import Options from './Options';
import GenerationStore from '../../stores/GenerationStore';


interface Props extends RouteComponentProps {
  rootStore: RootStore
}

@inject((root: any) => ({
  rootStore: root.store as RootStore
}))
@observer
export default class StepsContainer extends React.Component<Props> {
  private generationStore: GenerationStore;

  constructor(props: any) {
    super(props);
    this.generationStore = this.props.rootStore.generationStore;
  }

  componentDidMount() {
    this.generationStore.setActiveStrep(GenerationStore.generationSteps[0].key);
  }

  onStepPress(stepKey: string) {
    this.props.history.push(`${this.props.match.url}/${stepKey}`);
  };

  render() {
    const steps = GenerationStore.generationSteps.map((step) => {

      let active = step.url === this.props.location.pathname;
      let completed =  this.generationStore.finishedSteps.has(step.key);
      return {
        ...step,
        link: true,
        onClick: () => {
          this.onStepPress(step.key)
        },
        active: active,
        completed: completed,
        disabled: !active && !completed
      }
    });

    return <div>
      <Step.Group widths={3} items={steps}/>
      <Route path={`${this.props.match.url}/${GenerationStore.generationSteps[0].key}`} component={AddText}/>
      <Route path={`${this.props.match.url}/${GenerationStore.generationSteps[1].key}`} component={Options}/>
    </div>
  }
}