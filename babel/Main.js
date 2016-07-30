import React from 'react';
import { pink300 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import ItemBox from './my/ItemBox';
import MenuBox from './my/MenuBox';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: pink300,
  },
});

function Main() {
  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <div>
        <AppBar
          title="Title"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        <MenuBox />
        <ItemBox />
        <RaisedButton
          label="Toggle Drawer"
        />
      </div>
    </MuiThemeProvider>
  );
}

Main.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default Main;
