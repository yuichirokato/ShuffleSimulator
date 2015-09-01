import AppDispatcher from '../dispatcher/AppDispatcher';

class ShuffleActionCreators {
  constructor() {

  }

  addItemCondition(id, condition) {
    AppDispatcher.dispatch({
      type: 'add',
      itemId: id,
      condition: condition
    });
  }

  removeItemCondition(id) {
    AppDispatcher.dispatch({
      type: 'remove',
      itemId: id
    });
  }

  updateDisplayProcess(isDisplay) {
    AppDispatcher.dispatch({
      type: 'updateDisplayProcess',
      isDisplay: isDisplay
    });
  }

  updateCustomNumberOfCards(num) {
    AppDispatcher.dispatch({
      type: 'updateCustomNumberOfCards',
      number: num
    });
  }
}

export default new ShuffleActionCreators();
