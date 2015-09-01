import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher';

const CHANGE_EVENT = 'change';
let conditions = [];
let isEnabledShuffleItems = false;

class ShuffleItemStore extends EventEmitter {
  constructor() {
    super();
    this.dispatchToken = AppDispatcher.register( action => {
      switch (action.type) {
        case 'add':
          this._addCondition(action);
          break;

        case 'remove':
          this._removeCondition(action);
          break;

        default:
          break;
      }
    });
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  getEnabledShuffleItems() {
    return isEnabledShuffleItems;
  }

  getConditions() {
    return conditions;
  }

  _addCondition(action) {
    let itemId = action.itemId;
    conditions[itemId] = action.condition;

    let enabled = conditions.map(condition => {
      return this._validateCheck(condition)
    }).reduce((a, b) => a && b, true);
    isEnabledShuffleItems = enabled;

    this.emitChange();
  }

  _removeCondition(action) {
    conditions.splice(action.itemId, 1);

    let enabled = conditions.map(condition => {
      return this._validateCheck(condition)
    }).reduce((a, b) => a && b, true);
    isEnabledShuffleItems = enabled;

    this.emitChange();
  }

  _validateCheck(condition) {

    console.log("validate, condition.type: " + condition.shuffleType);

    switch (condition.shuffleType) {
      case 'cut':
      case 'deal':
        return this._defaultShuffleCheck(condition);
        break;

      case 'hindu':
        return this._hinduShuffleCheck(condition);
        break;

      case 'faro':
        return this._faroShuffleCheck(condition);
        break;

      default:
        return false;
    }
  }

  _defaultShuffleCheck(condition) {
    let fromRangeValid = condition.fromRange !== -1;
    let toRangeValid = condition.toRange !== -1;
    let timesValid = condition.shuffleTimes > 0;
    let rangeValid = condition.fromRange <= condition.toRange;

    console.log("condition.fromRange !== -1: " + fromRangeValid);
    console.log("condition.toRange !== -1: " + toRangeValid);
    console.log("condition.shuffleTimes > 0: " + timesValid);
    console.log("condition.fromRange <= condition.toRange: " + rangeValid);

    return ((fromRangeValid && toRangeValid && rangeValid) || condition.startIsRandom) &&
           timesValid;
  }

  _hinduShuffleCheck(condition) {
    let first = this._defaultShuffleCheck(condition);
    let endFromRange = condition.endFromRange;
    let endToRange = condition.endToRange;

    return (((endFromRange <= endToRange) &&
           (endFromRange !== -1) &&
           (endToRange !== -1)) || condition.endIsRandom) &&
           (first);
  }

  _faroShuffleCheck(condition) {
    return condition.shuffleTimes > 0;
  }
}

export default new ShuffleItemStore();
