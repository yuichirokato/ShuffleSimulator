import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher';

let isDisplayProcess = false;
let numberOfCards = 0;

class SettingsStore extends EventEmitter {
  constructor() {
    super();

    this.dispatchToken = AppDispatcher.register(action => {
      if (action.type === 'updateDisplayProcess') {
        isDisplayProcess = action.isDisplay;
      }

      if (action.type === 'updateCustomNumberOfCards') {
        numberOfCards = action.number;
      }
    });
  }

  getEachDisplay() {
    return isDisplayProcess;
  }

  getNumberOfCards() {
    return numberOfCards;
  }
}

export default new SettingsStore();
