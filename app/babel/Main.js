import React from 'react';
import axios from 'axios';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBlueTheme from './my/darkBlueTheme';
import Container from './my/Container';

const muiTheme = getMuiTheme(darkBlueTheme);

class Main extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleClickMenu = this.handleClickMenu.bind(this);

    this.state = {
      structure: [],
      activeAlbumId: 'game_wafu',
      album: {},
    };
  }

  componentDidMount() {
    axios.get('/tracklists/_structure.json')
      .then((response) => {
        this.setState({ structure: response.data });
      })
      .catch((response) => {
        console.error(response);
      });

    this.loadTracklistFromServer(this.state.activeAlbumId);
  }

  loadTracklistFromServer(activeAlbumId) {
    axios.get('/tracklists/albums.json')
      .then((response) => {
        this.setState({ album: response.data[activeAlbumId] });
      })
      .catch((response) => {
        console.error(response);
      });
  }

  handleClickMenu(arg) {
    this.setState({ activeAlbumId: arg });
    this.loadTracklistFromServer(arg);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Container
          structure={this.state.structure}
          activeAlbumId={this.state.activeAlbumId}
          album={this.state.album}
          clickMenu={this.handleClickMenu}
        />
      </MuiThemeProvider>
    );
  }
}

Main.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default Main;
