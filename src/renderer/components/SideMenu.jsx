import React from 'react';
import mui from 'material-ui';
import { DropDownMenu } from 'material-ui';
import { Toggle } from 'material-ui';
import { RadioButtonGroup } from 'material-ui';
import { RadioButton } from 'material-ui';
import { TextField } from 'material-ui';
import { AppCanvas } from 'material-ui';
import { Card } from 'material-ui';
import ShuffleActionCreators from '../../actions/ShuffleActionCreators';

let ThemeManager = new mui.Styles.ThemeManager();

let modeItems = [
  { payload: "tramp", text: "Tramp" },
  { payload: "custom", text: "Custom" }
];

let holdemItems = [
  { payload: '2', text: "2"　},
  { payload: '3', text: "3"　},
  { payload: '4', text: "4"　},
  { payload: '5', text: "5"　},
  { payload: '6', text: "6"　},
  { payload: '7', text: "7"　},
  { payload: '8', text: "8"　},
];

let styles = {
  list: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    flexBasis: 100,
  },
  group: {
    marginTop: 20,
    marginLeft: 20
  },
  holdemToggle: {
    marginTop: 15,
    marginRight: 15,
  },
  numberOfCardsField: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    width: 150
  }
}

class SideMenu extends React.Component {

  static childContextTypes = {
    muiTheme: React.PropTypes.object
  }

  state = {
    mode: 'tramp',
    holdemNumber: 0,
    isRenderHoldemNumber: false,
    errorText: '',
  }

  constructor() {
    super();
  }

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }

  render() {

    let body = this.renderTrampSettings();

    if (this.state.mode === 'custom') {
      body = this.renderCustomSettings();
    }

    return (
      <Card style={styles.list}>
          <DropDownMenu menuItems={modeItems}
            onChange={this.handleModeChange.bind(this)} />
          {body}
          <Toggle name="displayProcess"
            label="displayProcess"
            style={styles.holdemToggle}
            onToggle={this.handleDisplayProcessChange.bind(this)} />
      </Card>
    );
  }

  renderCustomSettings() {
    return (
      <TextField
        style={styles.numberOfCardsField}
        floatingLabelText="Number of cards"
        errorText={this.state.errorText}
        onChange={this.handleCustomCardsChange.bind(this)} />
    );
  }

  renderTrampSettings() {
    let content = this.state.isRenderHoldemNumber ? this.renderHoldemNumber() : null;

    return (
      <div>
        <Toggle
          style={styles.holdemToggle}
          name="hold'em"
          label="Texas Hold'em"
          onToggle={this.handleHoldemChange.bind(this)} />
        {content}
      </div>
    );
  }

  renderHoldemNumber() {
    return (
      <DropDownMenu menuItems={holdemItems}
        onChange={this.handleHoldemNumberChange.bind(this)} />
    );
  }

  handleHoldemChange(e, toggled) {
    this.setState({
      isRenderHoldemNumber: toggled
    });
  }

  handleHoldemNumberChange(e, index, item) {
    this.setState({
      holdemNumber: item.payload
    });
  }

  handleDisplayProcessChange(e, toggled) {
    console.log("toggled: " + toggled);
    ShuffleActionCreators.updateDisplayProcess(toggled);
  }

  handleModeChange(e, index, item) {
    this.setState({
      mode: item.payload
    });
  }

  handleCustomCardsChange(e) {
    let num = e.target.value;
    if (num.match(/[^0-9]+/)) {
      this.setState({
        errorText: "Please input number",
      });

      ShuffleActionCreators.updateCustomNumberOfCards(0);
      return;
    }

    this.setState({
      errorText: ''
    });

    ShuffleActionCreators.updateCustomNumberOfCards(num);
  }
}

module.exports = SideMenu;
