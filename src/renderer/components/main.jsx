import React from 'react';
import shell from 'shell';
import SideMenu from './SideMenu';
import ShuffleMenu from './ShuffleMenu';
import mui from 'material-ui';
import { AppCanvas } from 'material-ui';

let ThemeManager = new mui.Styles.ThemeManager();

let styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
  }
}

export class Main extends React.Component {
  state = {
    message: 'Hello, Electron'
  }

  constructor () {
    super();
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
    return (
      <div className="main" style={styles.container}>
        <SideMenu />
        <ShuffleMenu />
      </div>
    );
  }
}
