import React from 'react';
import ShuffleItem from './ShuffleItem';
import mui from 'material-ui';
import { FloatingActionButton } from 'material-ui';
import { RaisedButton } from 'material-ui';
import { FlatButton } from 'material-ui';
import { TextField } from 'material-ui';
import { Snackbar } from 'material-ui';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import InjectTapEventPlugin from 'react-tap-event-plugin';
import ShuffleItemStore from '../../store/ShuffleItemStore';
import Shuffle from '../../actions/Shuffle';
import path from 'path';
import FileWriter from '../../utils/FileWriter';

InjectTapEventPlugin();
let ThemeManager = new mui.Styles.ThemeManager();

ThemeManager.setTheme(ThemeManager.types.LIGHT);

let dirHome = process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"];
let defaultPath = path.join(dirHome, "Desktop");
let shufflePoints = [
  { payload: 1, text: 'Continuity' },
  { payload: 2, text: 'Fix' }
];

let styles = {
  cardStyle: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 20,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 10
  },
  numberOfCardsStyle: {
    marginLeft: 20
  },
  numberOfExecutionStyle: {
    marginLeft: 20
  },
  bottomContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  executionButtonStyle: {
    marginTop: 10,
    marginRight: 10
  },
  executionSecondsLabelStyle: {
    marginTop: 10,
  }
}

class ShuffleMenu extends React.Component {

  state = {
    shuffleItems: [],
    checkNumberOfCards: 0,
    execution: 0,
    executionSeconds: 2,
    checkCardErrorText: '',
    executionErrorText: '',
    shuffleEnabled: false,
    outputPath: defaultPath
  }

  constructor() {
    super();
  }

  componentWillMount() {
    if (this.state.shuffleItems.length <= 0) {
      this.setState({
        shuffleItems: [this.renderShuffleItem(0, false)],
        executionSeconds: 2,
      });
    }
  }

  componentDidMount() {
    ShuffleItemStore.addChangeListener(this.handleItemChange.bind(this));
  }

  componentWillUnmount() {
    ShuffleItemStore.removeChangeListener(this.handleItemChange.bind(this));
  }

  componentDidUpdate(prevProps, prevState) {
    let conditions = ShuffleItemStore.getConditions();
  }

  static childContextTypes = {
    muiTheme: React.PropTypes.object
  }

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }

  render() {
    let items = this.state.shuffleItems.length > 0
                ? this.state.shuffleItems
                : this.renderShuffleItem(0, false);

    return (
      <div className="shuffles">
        {items}
        {this.renderAddButton()}
        {this.renderCheckNumberOfCardsField()}
        {this.renderShuffleNumberOfExecutionsField()}
        <div style={styles.bottomContainer}>
          {this.renderExecutionSecondsLabel()}
          {this.renderExecutionButton()}
        </div>
        <Snackbar
          message="Shuffles Complete"
          autoHideDuration={3000}
          ref="snack" />
      </div>
    );
  }

  renderShuffleItem(id, showRemoveButton) {
    return (<ShuffleItem
      style={styles.cardStyle}
      cardId={id}
      showRemoveButton={showRemoveButton}
      removeHandler={this.handleItemRemove.bind(this)} />
    );
  }

  renderAddButton() {
    return (
      <div className="add-button">
        <FloatingActionButton
          onClick={this.handleAddButtonClick.bind(this)}
          primary={true} >
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }

  renderCheckNumberOfCardsField() {
    return (
      <TextField
        style={styles.numberOfCardsStyle}
        floatingLabelText="Check number of cards"
        errorText={this.state.checkCardErrorText}
        onChange={this.handleCheckNumberOfCardsChange.bind(this)} />
    );
  }

  renderShuffleNumberOfExecutionsField() {
    return (
      <TextField
        style={styles.numberOfExecutionStyle}
        floatingLabelText="Shuffle number of execution"
        errorText={this.state.executionErrorText}
        onChange={this.handleShuffleNumberOfExecutionChange.bind(this)} />
    );
  }

  renderExecutionButton() {
    return (
        <RaisedButton
          style={styles.executionButtonStyle}
          disabled={!this.state.shuffleEnabled}
          label="Shuffle!"
          secondary={true}
          onClick={this.handleShuffleButtonClick.bind(this)} />
    );
  }

  renderExecutionSecondsLabel() {
    return (
      <FlatButton
        style={styles.executionSecondsLabelStyle}
        label={this.state.executionSeconds +  "  seconds"}
        disabled={true} />
    );
  }

  renderOutPutFilePath() {
    return (
      <RaisedButton secondary={true} label="Path Select">
        <input type="file" onChange={this.handlePathChange.bind(this)}></input>
      </RaisedButton>
    );
  }

  handleAddButtonClick(e) {
    let num = this.state.shuffleItems.length;
    let items = this.state.shuffleItems;
    items[num] = this.renderShuffleItem(num, true);
    this.setState({
      shuffleItems: items,
      executionSeconds: this.state.executionSeconds + 2
    });
  }

  handleShuffleButtonClick(e) {
    let conditions = ShuffleItemStore.getConditions();
    let results = Shuffle.shuffleStart(conditions, this.state.execution, []);
    let allShuffleTimes = this._calcAllShuffleTimes();
    let allShuffleSeconds = this._calcAllShuffleSeconds();
    let shuffleTypeNum = this._calcShuffleTypeNumber();
    let template = "Types: " + shuffleTypeNum + ", " + "AllShuffleTimes: " + allShuffleTimes + ", " + "AllShuffleSeconds: " + allShuffleSeconds + ", " + "CheckNumberOfCards: " + this.state.checkNumberOfCards + ", " + "ExecutionTimes: " + this.state.execution + "\n";
    let result = results.string + template;

    FileWriter.writeString(result, "all");
    this.refs.snack.show();
  }

  handleCheckNumberOfCardsChange(e) {
    let number = e.target.value;

    if (number.match(/[^0-9]+/)) {
      this.setState({
        checkCardErrorText: 'Please input number',
        checkNumberOfCards: 0,
        shuffleEnabled: false,
      });
      return;
    }

    if (number > 52 && number) {
      this.setState({
        checkCardErrorText: 'Out of range',
        checkNumberOfCards: 0,
        shuffleEnabled: false
      });
      return;
    }

    let enabled = ShuffleItemStore.getEnabledShuffleItems();
    let isEnabled = enabled && this.state.execution > 0 && number > 0;
    this.setState({
      checkCardErrorText: '',
      checkNumberOfCards: number,
      shuffleEnabled: isEnabled
    });
  }

  handleShuffleNumberOfExecutionChange(e) {
    let number = e.target.value;

    if (number.match(/[^0-9]+/)) {
      this.setState({
        executionErrorText: 'Please input number',
        execution: 0,
        shuffleEnabled: false,
        executionSeconds: 0
      });
      return;
    }

    let enabled = ShuffleItemStore.getEnabledShuffleItems();
    let isEnabled = enabled && number > 0 && this.state.checkNumberOfCards > 0;
    let seconds = this._calcAllShuffleSeconds(number);
    this.setState({
      executionErrorText: '',
      execution: number,
      shuffleEnabled: isEnabled,
      executionSeconds: seconds
    });
  }

  handleItemRemove(e, index) {
    let items = this.state.shuffleItems;
    items.splice(index, 1);
    this.setState({
      suffleItems: items,
      executionSeconds: items.length * 3
    });
  }

  handleItemChange() {
    this._updateEnabled();
  }

  handlePathChange(e) {
    let path = e.target.value;
    this.setState({
      outputPath: path
    });
  }

  _updateEnabled() {
    let enabled = ShuffleItemStore.getEnabledShuffleItems();
    let shuffleEnabled = enabled && this.state.execution > 0 && this.state.checkNumberOfCards > 0;
    let seconds = this._calcAllShuffleSeconds();
    this.setState({
      shuffleEnabled: shuffleEnabled,
      executionSeconds: seconds
    });
  }

  _calcAllShuffleTimes() {
    let conditions = ShuffleItemStore.getConditions();
    let execution = this.state.execution;
    return conditions.map(condition => condition.shuffleTimes).reduce((a, b) => a + b, 0) * execution;
  }

  _calcAllShuffleSeconds(execution) {
    let conditions = ShuffleItemStore.getConditions();
    let exe = execution === undefined ? this.state.execution : execution;

    return conditions.map(condition => {
      return condition.shuffleTimes * condition.shuffleSeconds;
    }).reduce((a, b) => a + b, 0) * exe;
  }

  _calcShuffleTypeNumber() {
    let conditions = ShuffleItemStore.getConditions();
    let cuts = conditions.filter(condition => condition.shuffleType === 'cut').length;
    let hindus = conditions.filter(condition => condition.shuffleType === 'hindu').length;
    let faros = conditions.filter(condition => condition.shuffleType === 'faro').length;
    let deals = conditions.filter(condition => condition.shuffleType === 'deal').length;

    return [cuts, hindus, faros, deals].filter(type => type > 0).length;
  }
}

module.exports = ShuffleMenu;
