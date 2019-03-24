import {action, ObservableSet} from 'mobx';

export default class GenerationStore {
  public static readonly generationSteps = [
    {
      url: '/generate/resource',
      key: 'resource',
      icon: 'file alternate outline',
      title: 'Resource',
      description: 'Add or link the resource',
    },
    {
      url: '/generate/options',
      key: 'options',
      icon: 'settings',
      title: 'Options',
      description: 'Configure the parameters',
    },
    {
      url: '/generate/result',
      key: 'result',
      icon: 'flag checkered',
      title: 'Result',
      description: 'Try and tweak the questions',
    }
  ];

  public activeStep: string = '';
  public finishedSteps = new ObservableSet<string>();


  @action setActiveStrep(key: string) {
    this.activeStep = key;
  }

  @action finishStep(key: string) {
    this.finishedSteps.add(key);
  }

  constructor() {
  }

}