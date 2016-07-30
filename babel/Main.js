import React from 'react';
import axios from 'axios';
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

class Main extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleClickMenu = this.handleClickMenu.bind(this);

    this.state = {
      structure: [],
      setId: 'game_wafu',
      album: {},
    };
  }

  componentDidMount() {
    this.loadFromServer(this.state.setId);
  }

  loadFromServer(setId) {
    axios.get('/tracklists/_structure.json')
      .then((response) => {
        this.setState({ structure: response.data });
      })
      .catch((response) => {
        console.error(response);
      });

    axios.get(`/tracklists/${setId}.json`)
      .then((response) => {
        this.setState({ album: response.data });
      })
      .catch((response) => {
        console.error(response);
      });
  }

  handleClickMenu(arg) {
    this.setState({ setId: arg });
    this.loadFromServer(arg);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <AppBar
            title="Title"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
          />
          <MenuBox structure={this.state.structure} toOya={this.handleClickMenu} />
          <ItemBox setId={this.state.setId} album={this.state.album} />
          <RaisedButton
            label="Toggle Drawer"
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

Main.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default Main;
