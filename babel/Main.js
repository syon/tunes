import React from 'react';
import { pink300 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
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
      </div>
    </MuiThemeProvider>
  );
}

Main.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default Main;
