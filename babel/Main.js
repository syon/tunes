import React from 'react';
import axios from 'axios';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBlueTheme from './my/darkBlueTheme';
import MenuBox from './my/MenuBox';
import Container from './my/Container';

const muiTheme = getMuiTheme(darkBlueTheme);

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
          <MenuBox structure={this.state.structure} toOya={this.handleClickMenu} />
          <Container setId={this.state.setId} album={this.state.album} />
        </div>
      </MuiThemeProvider>
    );
  }
}

Main.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default Main;
