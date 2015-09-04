import React from 'react';
import mui from 'material-ui';
import { Card } from 'material-ui';
import { CardHeader } from 'material-ui';
import { DropDownMenu } from 'material-ui';
import { TextField } from 'material-ui';
import { IconButton } from 'material-ui';
import { Checkbox } from 'material-ui';
import { RaisedButton } from 'material-ui';
import ContentClear from 'material-ui/lib/svg-icons/content/clear';
import ShuffleActionCreators from '../../actions/ShuffleActionCreators';

let ThemeManager = new mui.Styles.ThemeManager();

ThemeManager.setTheme(ThemeManager.types.LIGHT);

let shuffleTypes = [
  { payload: 'cut', text: 'Cut' },
  { payload: 'hindu', text: 'Hindu' },
  { payload: 'faro', text: 'Faro' },
  { payload: 'deal', text: 'Deal' }
];

let styles = {
  shuffleTimes: {
    width: 100,
  },
  shuffleItemHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  shuffleItemBody: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  shuffleNumber: {
    alignSelf: 'flex-start',
    marginLeft: 25,
    marginBottom: 30,
    width: 150
  },
  rangeContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  fromRange: {
    width: 120,
    marginLeft: 25
  },
  toRange: {
    width: 120,
    marginLeft: 25
  },
  checkbox: {
    marginLeft: 20,
    marginTop: 30,
    width: 300
  }
}

class ShuffleItem extends React.Component {

  static propTypes = {
    cardId: React.PropTypes.number.isRequired,
    removeHandler: React.PropTypes.func.isRequired,
    validateCheck: React.PropTypes.func.isRequired,
    showRemoveButton: React.PropTypes.bool,
    style: React.PropTypes.object
  }

  static childContextTypes = {
    muiTheme: React.PropTypes.object
  }

  state = {
    shuffleType: 'cut',
    errorText: '',
    shuffleTimes: 0,
    fromRaneError: '',
    toRangeError: '',
    endFromRangeError: '',
    endToRangeError: '',
    fromRange: -1,
    toRange: -1,
    endFromRange: -1,
    endToRange: -1,
    startRangeUseRandom: false,
    startRangeTextDisabled: false,
    endRangeUseRandom: false,
    endRangeTextDisabled: false,
    shuffleSeconds: 2
  }

  constructor() {
    super();
  }

  componentDidMount() {
    console.log("cardId: " + this.props.cardId);
    this._emitState();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state === prevState) {
      return;
    }

    this._emitState();
  }

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }

  render() {
    return (
      <Card style={this.props.style}>
        {this.renderShuffleItemHeader()}
        {this.renderShuffleBody()}
        {this.renderShuffleNumber()}
      </Card>
    );
  }

  renderShuffleItemHeader() {

    let removeButton = null;
    if (this.props.showRemoveButton) {
      removeButton = this.renderRemoveButton();
    }

    return (
      <div style={styles.shuffleItemHeader}>
        <DropDownMenu
          menuItems={shuffleTypes}
          onChange={this.handleTypeChange.bind(this)}
          style={{ width: 150 }} />
        {removeButton}
      </div>
    );
  }

  renderShuffleBody() {
    let shuffleRange = null;
    let cutType = null;
    let type = this.state.shuffleType;

    if (type === 'cut' || type === 'deal') {
      shuffleRange = this.renderDefaultRange();
    }

    if (type === 'hindu') {
      shuffleRange = this.renderHinduRange();
    }

    return (
      <div style={styles.shuffleItemBody}>
        {shuffleRange}
        {cutType}
      </div>
    );
  }

  renderDefaultRange(fromText, toText) {
    return (
      <div style={styles.rangeContainer}>
        <TextField
          style={styles.fromRange}
          onChange={this.handleFromRangeChange.bind(this)}
          floatingLabelText={fromText || "From range"}
          errorText={this.state.fromRangeError}
          disabled={this.state.startRangeTextDisabled} />
          <TextField
            style={styles.toRange}
            onChange={this.handleToRangeChange.bind(this)}
            floatingLabelText={ toText || "To range" }
            errorText={this.state.toRangeError}
            disabled={this.state.startRangeTextDisabled} />
          <Checkbox
            style={styles.checkbox}
            name="startRange"
            label="Use Random Number"
            onCheck={this.handleStartRangeRandomCheck.bind(this)} />
      </div>
    );
  }

  renderHinduRange() {
    return (
      <div>
        {this.renderDefaultRange("start from range", "start to range")}
        <div style={styles.rangeContainer}>
          <TextField
            style={styles.fromRange}
            onChange={this.handleEndFromRangeChange.bind(this)}
            floatingLabelText="end from range"
            errorText={this.state.endFromRangeError}
            disabled={this.state.endRangeTextDisabled} />
          <TextField
            style={styles.toRange}
            onChange={this.handleEndToRangeChange.bind(this)}
            floatingLabelText="end to range"
            errorText={this.state.endToRangeError}
            disabled={this.state.endRangeTextDisabled} />
            <Checkbox
              style={styles.checkbox}
              name="endRange"
              label="Use Random Number"
              onCheck={this.handleEndRangeRandomCheck.bind(this)} />
          </div>
      </div>
    );
  }

  renderShuffleNumber() {
    return (
      <TextField
        style={styles.shuffleNumber}
        onChange={this.handleShuffleTimesChange.bind(this)}
        floatingLabelText="Shuffle Times"
        errorText={this.state.errorText} />
    );
  }

  renderRemoveButton() {
    return (
      <IconButton
        tooltip="Remove"
        tooltipPosition="bottom-left"
        onClick={this.handleRemove.bind(this)}>
        <ContentClear />
      </IconButton>
    );
  }

  handleTypeChange(e, selectedIndex, item) {
    let type = item.payload;
    let seconds = this._getSeconds(type);

    this.setState({
      shuffleType: type,
      shuffleSeconds: seconds
    });
  }

  handleShuffleTimesChange(e) {
    let input = e.target.value;
    let isNumber = this._isNumber(input);
    let times = isNumber ? input : 0;
    let errorText = isNumber ? '' : 'Please input number';

    this.setState({
      errorText: errorText,
      shuffleTimes: times
    });
  }

  handleRemove(e) {
    this.props.removeHandler(this.props.cardId);
    this._removeState();
  }

  handleFromRangeChange(e) {
    let input = e.target.value;
    let isNumber = this._isNumber(input);
    let fromRange = isNumber ? input : -1;
    let errorText = isNumber ? '' : 'Please input number';

    this.setState({
      fromRangeError: errorText,
      fromRange: fromRange
    });
  }

  handleToRangeChange(e) {
    let input = e.target.value;
    let isNumber = this._isNumber(input);
    let toRange = isNumber ? input : -1;
    let errorText = isNumber ? '' : 'Please input number';

    this.setState({
      toRangeError: errorText,
      toRange: toRange
    });
  }

  handleEndFromRangeChange(e) {
    let input = e.target.value;
    let isNumber = this._isNumber(input);
    let fromRange = isNumber ? input : -1;
    let errorText = isNumber ? '' : 'Please input number';

    this.setState({
      endFromRangeError: errorText,
      endFromRange: fromRange
    });
  }

  handleEndToRangeChange(e) {
    let input = e.target.value;
    let isNumber = this._isNumber(input);
    let toRange = isNumber ? input : -1;
    let errorText = isNumber ? '' : 'Please input number';

    this.setState({
      endToRangeError: errorText,
      endToRange: toRange
    });
  }

  handleStartRangeRandomCheck(e, checked) {
    this.setState({
      startRangeUseRandom: checked,
      startRangeTextDisabled: checked,
    });
  }

  handleEndRangeRandomCheck(e, checked) {
    this.setState({
      endRangeUseRandom: checked,
      endRangeTextDisabled: checked,
    });
  }

  _emitState() {
    let item = {
      shuffleType: this.state.shuffleType,
      shuffleTimes: this.state.shuffleTimes,
      shuffleSeconds: this.state.shuffleSeconds
    };

    console.log("item.shuffleType: " + item.shuffleType);

    switch (item.shuffleType) {
      case 'cut':
      case 'deal':
        item.fromRange = this.state.fromRange;
        item.toRange = this.state.toRange;
        item.startIsRandom = this.state.startRangeUseRandom
        break;

      case 'hindu':
        item.fromRange = this.state.fromRange;
        item.toRange = this.state.toRange;
        item.startIsRandom = this.state.startRangeUseRandom
        item.endFromRange = this.state.endFromRange;
        item.endToRange = this.state.endToRange;
        item.endIsRandom = this.state.endRangeUseRandom
        break;

      default:
        break;
    }

    ShuffleActionCreators.addItemCondition(this.props.cardId, item);
  }

  _removeState() {
    ShuffleActionCreators.removeItemCondition(this.props.cardId);
  }

  _isNumber(input) {
    if (input.match(/[^0-9]+/)) {
      return false;
    }

    return true;
  }

  _getSeconds(type) {
    switch (type) {
      case 'cut':
        return 2;

      case 'hindu':
        return 3;

      case 'deal':
        return 30;

      case 'faro':
        return 7;

      default:
        return 2;
    }
  }
}

ShuffleItem.defaultProps = {
  showRemoveButton: true,
  style: {}
};

module.exports = ShuffleItem;
