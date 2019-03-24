import {action, observable, ObservableSet} from 'mobx';

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
      url: '/generate/result',
      key: 'result',
      icon: 'flag checkered',
      title: 'Result',
      description: 'Try and tweak the questions',
    }
  ];


  @observable public activeStep: string = '';
  @observable public finishedSteps = new ObservableSet<string>();

  @observable public inputs = {
    url: '',
    text: ''
  };
  @observable selectedTextInputOption = 'url';
  @observable public text = '';
  @observable public loading = false;

  @observable questions?: any;

  @action setActiveStep(key: string) {
    this.activeStep = key;
  }

  @action finishStep(key: string) {
    this.finishedSteps.add(key);
  }

  @action
  async getText() {
    if (this.selectedTextInputOption === 'text') {
      return this.inputs.text;
    }
    // todo export in a class
    // fetch the text with diffbot's API
    let result = await fetch(`https://api.diffbot.com/v3/analyze?token=13d5f471ce7cd4a6c49546e0313f3aca&paging=false&url=${this.inputs.url}`)
    // @ts-ignore
      .then((response) => response.json())
      .catch((err) => Promise.reject(err));

    return result.objects[0].text;
  }

  @action
  async generateQuestions() {
    this.loading = true;
    let text = await this.getText();

    const GENERATOR_API = `http://192.168.43.182:80/generate?text=${text}`;

    this.questions = await fetch(GENERATOR_API)
      .then((response) => response.json())
      .catch((err) => Promise.reject(err));

    this.loading = false;
  }

  constructor() {
  }

}