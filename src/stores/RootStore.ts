import GenerationStore from './GenerationStore';

export default class RootStore {
  public generationStore: GenerationStore;

  constructor() {
    this.generationStore = new GenerationStore();
  }
}