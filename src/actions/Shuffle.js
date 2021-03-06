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

    if (times <= 0) {
      let string = results.reduce((a, b) => a + b, '');
      return { deck: result, string: string };
    }

    if (deck.length === 0) {
      _deck = this._createDeck();
      maxTimes = times;
    }

    gloabalIndex = maxTimes - times;
    let result = this._localShuffle(conditions, _deck);

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
      // console.log("_deck: " + JSON.stringify(_deck));
      let csv = FileWriter.arrayToCsvString(_deck);
      let template = FileWriter.createSettingsTemplate(condition);

      localResults[localResults.length] = template + csv;
    });

    return _deck;
  }

  _shuffleRouter(condition, deck) {

    console.log("condition: " + JSON.stringify(condition));

    let type = condition.shuffleType;

    if (type === 'cut') {
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

    if (type === 'deal') {
      let fromRange = condition.fromRange;
      let toRange = condition.toRange;
      let isRandom = condition.startIsRandom;
      let times = condition.shuffleTimes;
      return this._dealShuffle(fromRange, toRange, isRandom, times, deck);
    }
  }

  _cutShuffle(fromNum, toNum, isRandom, times, deck) {
    if (times <= 0) {
      itemResults = [];
      return deck;
    }

    let endPoint = isRandom ? this._createRandom() : this._createRandom(fromNum, toNum);
    let newDeck = deck.slice(0, endPoint);
    let result = deck.slice(endPoint).concat(newDeck);

    if (itemResults.length <= 0) {
      localMaxTimes = times;
    }

    let index = localMaxTimes - times;

    if (isDisplayProcess) {
      // console.log("cut isDisplay True!");
      let suffix = "cut-" + gloabalIndex + "-" + middleIndex + "-" + index;
      let condition = { shuffleType: "cut", fromRange: fromNum, toRange: toNum, shuffleTimes: localMaxTimes };
      FileWriter.writeProcess(result, condition, suffix);
    }

    itemResults[itemResults.length] = index;

    return this._cutShuffle(fromNum, toNum, isRandom, times - 1, result);
  }

  _hinduShuffle(startFrom, startTo, endFrom, endTo, isRandom, endIsRandom, times, deck) {
    if (times <= 0) {
      itemResults = [];
		  return deck;
	  }

    let start = isRandom ? this._createRandom() : this._createRandom(startFrom, startTo);
	  let end = endIsRandom ? this._createRandom() : this._createRandom(endFrom, endTo);
    let isError = start > end ? 'error!' : 'no error!';
    // console.log("endTo: " + endTo);
    // console.log("start: " + start);
    // console.log("end: " + end);
    // console.log("times: " + times);
    // console.log("start > end: " + isError);

	  if (start > end) {
      // console.log("やり直し！");
		  return this._hinduShuffle(startFrom, startTo, endFrom, endTo, isRandom, endIsRandom, times, deck);
	  }

    if (itemResults.length <= 0) {
      localMaxTimes = times;
    }

    let index = localMaxTimes - times;
	  let middleDeck = deck.slice(start - 1, end);
	  let bottomDeck = deck.slice(end);
	  let topDeck = deck.slice(0, start - 1);

    // console.log("middle: " + JSON.stringify(middleDeck));
    // console.log("top: " + JSON.stringify(topDeck));
    // console.log("bottom: " + JSON.stringify(bottomDeck));

	  let result = flatten([middleDeck, topDeck, bottomDeck]);

    // console.log("hindu result: " + JSON.stringify(result));

    if (isDisplayProcess) {
      let suffix = "hindu-" + gloabalIndex + "-" + middleIndex + "-" + index;
      let condition = { shuffleType: "hindu", fromRange: startFrom, toRange: startTo, endFromRange: endFrom, endToRange: endTo, shuffleTimes: localMaxTimes };
      FileWriter.writeProcess(result, condition, suffix);
    }

    itemResults[itemResults.length] = index;

	  return this._hinduShuffle(startFrom, startTo, endFrom, endTo, isRandom, endIsRandom, times - 1, result);
  }

  _faroShuffle(times, deck) {
    if (times <= 0) {
      itemResults = [];
      return deck;
    }

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

    result.reverse();

    let index = localMaxTimes - times;
    if (isDisplayProcess) {
      let suffix = "faro-" + gloabalIndex + "-" + middleIndex + "-" + index;
      let condition = { shuffleType: "faro", shuffleTimes: localMaxTimes };
      FileWriter.writeProcess(result, condition, suffix);
    }

    itemResults[itemResults.length] = index;

	  return this._faroShuffle(times - 1, result);
  }

  _dealShuffle(fromNum, toNum, isRandom, times, deck) {
    // console.log("times: " + times);
    if (times <= 0) {
      itemResults = [];
      // console.log("result: " + JSON.stringify(deck));
      return flatten(deck);
    }

    let num = isRandom ? this._createRandom() : this._createRandom(fromNum, toNum);
	  let decks = this._createEmptyDecks(num);
	  let surplus = deck.length % num;

    // console.log("num: " + num);
    // console.log("deck: " + JSON.stringify(deck));

    if (itemResults.length <= 0) {
      localMaxTimes = times;
    }

	  if (num === 1) {
		  deck.reverse();

      if (isDisplayProcess) {
        let suffix = "deal-" + gloabalIndex + "-" + middleIndex + "-" + index;
        let condition = { shuffleType: "deal", fromRange: fromNum, toRange: toNum, shuffleTimes: localMaxTimes };
        FileWriter.writeProcess(deck, condition, suffix);
      }

      let index = localMaxTimes - times;
      itemResults[itemResults.length] = index;

		  return this._dealShuffle(fromNum, toNum, isRandom, times - 1, deck);
	  }

    let result = [...Array(num).keys()].map(index => {
      return this._getSubDeckIndex(index, num, deck).map(i => deck[i]);
    });

	  if (surplus) {
		  let surplusIndex = deck.length - surplus;
      [...Array(surplus).keys()].forEach(index => {
        let subDeckIndex = result[index].length;
        result[index][subDeckIndex] = deck[surplusIndex];
        surplusIndex++;
      });
	  }

    result.forEach(deck => deck.reverse());

    if (isDisplayProcess) {
      let suffix = "deal-" + gloabalIndex + "-" + middleIndex + "-" + index;
      let condition = { shuffleType: "deal", fromRange: fromNum, toRange: toNum, shuffleTimes: localMaxTimes };
      FileWriter.writeProcess(flatten(result), condition, suffix);
    }

    let index = localMaxTimes - times;
    itemResults[itemResults.length] = index;

	  return this._dealShuffle(fromNum, toNum, isRandom, times - 1, flatten(result));
  }

  _createDeck() {
    let sutes = ['spade', 'club', 'heart', 'dia'];
    let result = flatten(
      sutes.map(sute => {
        return Array.from(Array(13).keys()).map(index => {
          return { sute: sute, number: index + 1 }
        });
      })
    );

    return result;
  }

  _createRandom(fromNum, toNum) {
    let startPoint = parseInt(fromNum, 10);
    let endPoint = parseInt(toNum, 10);

    if (fromNum === undefined || toNum === undefined) {
      let result = Math.floor(Math.random() * (52 - 1) + 1);
      // console.log("result: " + result);
      return result;
    }

    let result = Math.floor(Math.random() * (endPoint - startPoint) + startPoint);

    return result;
  }

  _createEmptyDecks(num) {
    return [...Array(num).keys()].map(index => []);
  }

  _getSubDeckIndex(fromNum, byNum, deck) {
    let maxIteration = Math.floor(deck.length / byNum);
    let indexs = [...Array(maxIteration).keys()].map(i => fromNum + byNum * i);
    // console.log("indexs: " + JSON.stringify(indexs));
    return indexs
  }
}

export default new Shuffle();
