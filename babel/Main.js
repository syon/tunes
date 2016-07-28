import React from 'react';
import { pink300 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import ItemBox from './my/ItemBox';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: pink300,
  },
});

function Main() {
  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <div>
        <ItemBox />
        <RaisedButton
          label="Toggle Drawer"
        />
        <Drawer>
          <MenuItem>Menu Item</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
        </Drawer>
      </div>
    </MuiThemeProvider>
  );
}

Main.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default Main;
