import React from 'react'
import {Step} from 'semantic-ui-react'
import RootStore from '../../stores/RootStore';
import {inject, observer} from 'mobx-react';
import {Route, RouteComponentProps} from 'react-router-dom';

import AddText from './AddText';
import Options from './Options';


interface Props extends RouteComponentProps {
  rootStore: RootStore
}

@inject((root: any) => ({
  rootStore: root.store.rootStore as RootStore
}))
@observer
export default class StepsContainer extends React.Component<Props> {
  state = {
    activeStepUrl: ''
  };

  componentDidMount() {
    console.log(this.props);
    this.setState({
      activeStepUrl: this.props.location.pathname
    })
  }

  onStepPress(stepKey: string) {
    this.props.history.push(`${this.props.match.url}/${stepKey}`);
  };

  render() {
    const steps = [
      {
        url: '/generate/text',
        key: 'text',
        icon: 'truck',
        title: 'Text',
        description: 'Add text or URL',
      },
      {
        url: '/generate/options',
        key: 'options',
        icon: 'payment',
        title: 'Options',
        description: 'Configure your questions',
      },
      {
        url: '/generate/result',
        key: 'result',
        icon: 'info',
        title: 'Result',
        description: 'Edit and save your test',
      }
    ].map((step) => ({
      ...step,
      link: true,
      onClick: () => {
        this.onStepPress(step.key)
      },
      active: step.url === this.props.location.pathname
    }));

    return <div>
      <Step.Group widths={3} items={steps}/>
      <Route path={'/generate/text'} component={AddText}/>
      <Route path={'/generate/options'} component={Options}/>
    </div>

  }
}