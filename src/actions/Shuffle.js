import SettingsStore from '../store/SettingsStore';
import FileWriter from '../utils/FileWriter';

const flatten = list => [].concat.apply([], list);

let middleIndex = 0;
let gloabalIndex = 0;
let maxTimes = 0;
let localMaxTimes = 0;
let itemResults = [];
let localResults = [];
let results = [];
let isDisplayProcess = SettingsStore.getEachDisplay();

class Shuffle {

  constructor() {
    // Nop
  }

  shuffleStart(conditions, times, deck) {
    let _deck = deck;

    if (deck.length === 0) {
      _deck = this._createDeck();
      maxTimes = times;
    }

    gloabalIndex = maxTimes - times;
    let result = this._localShuffle(conditions, _deck);

    if (times - 1 < 0) {
      let string = results.reduce((a, b) => a + b, '');
      return { deck: result, string: string };
    }

    results[results.length] = localResults.join(',');
    localResults = [];
    return this.shuffleStart(conditions, times - 1, result);
  }

  _localShuffle(conditions, deck) {
    let _deck = deck;
    let eachDisplay = SettingsStore.getEachDisplay();

    [...Array(conditions.length).keys()].forEach(index => {
      let condition = conditions[index];
      console.log("type: " + JSON.stringify(condition));
      middleIndex = index;
      _deck = this._shuffleRouter(condition, _deck);
      let csv = FileWriter.arrayToCsvString(_deck);
      let template = FileWriter.createSettingsTemplate(condition);

      localResults[localResults.length] = template + csv;
    });

    return _deck;
  }

  _shuffleRouter(condition, deck) {

    console.log("condition: " + JSON.stringify(condition));

    let type = condition.shuffleType;

    if (type === 'cut' || type === 'deal') {
      let fromRange = condition.fromRange;
      let toRange = condition.toRange;
      let isRandom = condition.startIsRandom;
      let times = condition.shuffleTimes;
      return this._cutShuffle(fromRange, toRange, isRandom, times, deck)
    }

    if (type === 'hindu') {
      let fromRange = condition.fromRange;
      let toRange = condition.toRange;
      let endFromRange = condition.endFromRange;
      let endToRange = condition.endToRange;
      let isRandom = condition.startIsRandom;
      let endIsRandom = condition.endIsRandom;
      let times = condition.shuffleTimes;
      return this._hinduShuffle(fromRange, toRange, endFromRange, endToRange, isRandom, endIsRandom, times, deck);
    }

    if (type === 'faro') {
      let times = condition.shuffleTimes;
      return this._faroShuffle(times, deck);
    }
  }

  _cutShuffle(fromNum, toNum, isRandom, times, deck) {
    let endPoint = isRandom ? this._createRandom() : this._createRandom(fromNum, toNum);
    let newDeck = deck.slice(0, endPoint);
    let result = deck.slice(endPoint).concat(newDeck);

    if (itemResults.length <= 0) {
      localMaxTimes = times;
    }

    let index = localMaxTimes - times;
    if (times - 1 < 0) {
      itemResults = [];
      return result;
    }

    if (isDisplayProcess) {
      let suffix = "cut-" + gloabalIndex + "-" + middleIndex + "-" + index;
      let condition = { shuffleType: "cut", fromRange: fromNum, toRange: toNum, shuffleTimes: localMaxTimes };
      FileWriter.writeProcess(result, condition, suffix);
    }

    itemResults[itemResults.length] = index;

    return this._cutShuffle(fromNum, toNum, isRandom, times - 1, result);
  }

  _hinduShuffle(startFrom, startTo, endFrom, endTo, isRandom, endIsRandom, times, deck) {
    let start = isRandom ? this._createRandom() : this._createRandom(startFrom, startTo);
	  let end = endIsRandom ? this._createRandom() : this._createRandom(endFrom, endTo);

	  if (start >= end) {
		  return this._hinduShuffle(startFrom, startTo, endFrom, endTo, isRandom, endIsRandom, times, deck);
	  }

    if (itemResults.length <= 0) {
      localMaxTimes = times;
    }

	  let middleDeck = deck.slice(start, end);
	  let bottomDeck = deck.slice(end);
	  let topDeck = deck.slice(0, start - 1);
	  let result = [middleDeck, topDeck, bottomDeck].flatten();

    let index = localMaxTimes - times;
	  if (times - 1 < 0) {
      itemResults = [];
		  return result;
	  }

    if (isDisplayProcess) {
      let suffix = "hindu-" + gloabalIndex + "-" + middleIndex + "-" + index;
      let condition = { shuffleType: "hindu", fromRange: startFrom, toRange: startTo, endFromRange: endFrom, endToRange: endTo, shuffleTimes: localMaxTimes };
      FileWriter.writeProcess(result, condition, suffix);
    }

    itemResults[itemResults.length] = index;

	  return this._hinduShuffle(startFrom, startTo, endFrom, endTo, isRandom, endIsRandom, times - 1, result);
  }

  _faroShuffle(times, deck) {
    let endPoint = deck.length / 2;
	  let arrayRight = deck.slice(0, endPoint);
	  let arrayLeft = deck.slice(endPoint);
	  let result = [];
	  let rightCount = 0;
	  let leftCount = 0;

    if (itemResults.length <= 0) {
      localMaxTimes = times;
    }

	  for (let i = 1; i < deck.length + 1; i++) {
		  if (i === 1 || i % 2 !== 0) {
			  result[i - 1] = arrayLeft[leftCount];
			  leftCount++;
		  } else {
			  result[i - 1] = arrayRight[rightCount];
			  rightCount++;
		  }
	  }

	  if (times - 1 < 0) {
      itemResults = [];
		  return result;
	  }

    let index = localMaxTimes - times;
    if (isDisplayProcess) {
      let suffix = "faro-" + gloabalIndex + "-" + middleIndex + "-" + index;
      let condition = { shuffleType: "faro", shuffleTimes: localMaxTimes };
      FileWriter.writeProcess(result, condition, suffix);
    }

    itemResults[itemResults.length] = index;

	  return this._faroShuffle(times - 1, result);
  }

  _dealShuffle(fromNum, toNum, times, deck) {
    let num = _createSubDeckNumber(fromNum, toNum);
	  let decks = _createEmptyDecks(num);
	  let result = [];
	  let surplus = deck.length % num;

    if (itemResults.length <= 0) {
      localMaxTimes = times;
    }

	  if (num === 1) {
		  deck.reverse();
		  if (times - 1 < 0) {
        itemResults = [];
			  return deck;
		  }

      if (isDisplayProcess) {
        let suffix = "deal-" + gloabalIndex + "-" + middleIndex + "-" + index;
        let condition = { shuffleType: "deal", fromRange: fromNum, toRange: toNum, shuffleTimes: localMaxTimes };
        FileWriter.writeProcess(deck, condition, suffix);
      }

      itemResults[itemResults.length] = index;

		  return this._dealShuffle(fromNum, toNum, times - 1, deck);
	  }

    result = [...Array(num).keys()].map(index => {
      return this._getSubDeckIndex(index, num).map(i => deck[i]);
    });

	  if (surplus) {
		  let surplusIndex = deck.length - surplus;
      [...Array(surplus).keys()].forEach(index => {
        let subDeckIndex = result[index].length;
        result[index][subDeckIndex] = deck[surplusIndex];
        surplusIndex++;
      });
	  }

	  if (times - 1 < 0) {
      itemResults = [];
		  return flatten(result);
	  }

    if (isDisplayProcess) {
      let suffix = "deal-" + gloabalIndex + "-" + middleIndex + "-" + index;
      let condition = { shuffleType: "deal", fromRange: fromNum, toRange: toNum, shuffleTimes: localMaxTimes };
      FileWriter.writeProcess(flatten(result), condition, suffix);
    }

    itemResults[itemResults.length] = index;

	  return this._dealShuffle(fromNum, toNum, times - 1, flatten(result));
  }

  _createDeck() {
    let sutes = ['spade', 'club', 'heart', 'dia'];
    let result = flatten(
      sutes.map(sute => {
        return Array.from(Array(13).keys()).map(index => {
          return { sute: sute, number: index }
        });
      })
    );

    return result;
  }

  _createRandom(fromNum, toNum) {
    if (fromNum === 'undefined' || toNum === 'undefined' || fromNum === toNum) {
      return Math.random() * (52 - 1) + 1;
    }

    return Math.random() * (toNum - fromNum) + fromNum;
  }

  _createEmptyDecks(num) {
    return [...Array(num).keys()].map(index => []);
  }

  _getSubDeckIndex(fromNum, byNum) {
    let maxIteration = deck.length / byNum;
    return [...Array(maxIteration + 1).keys()].map(i => fromNum + byNum * i);
  }

  _createSubDeckNumber(fromNum, toNum) {
    if (from === 'undefined' || to === 'undefined' || fromNum === toNum) {
		  return Math.random() * (8 - 1) + 1;
	  }

	  return Math.random() * (to - fromNum) + fromNum;
  }
}

export default new Shuffle();
