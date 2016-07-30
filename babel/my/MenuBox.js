import React from 'react';
import _ from 'lodash';
import axios from 'axios';
import Drawer from 'material-ui/Drawer';
import AlbumItem from './AlbumItem';

const propTypes = {
  toOya: React.PropTypes.func,
};

class MenuBox extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      thumbed: false,
      structure: [],
    };
  }

  componentDidMount() {
    this.loadFromServer();
  }

  loadFromServer() {
    axios.get('/tracklists/_structure.json')
      .then((response) => {
        this.setState({ structure: response.data });
      })
      .catch((response) => {
        console.error('/retrieve', response);
      });
  }

  handleClick(a) {
    this.props.toOya(a);
  }

  render() {
    const nodes = [];
    _.each(this.state.structure, (m) => {
      _.each(m.listset, (t) => {
        nodes.push(
          <AlbumItem track={t} toAaaa={this.handleClick} />
        );
      });
    });
    return (
      <Drawer>
        {nodes}
      </Drawer>
    );
  }
}

MenuBox.propTypes = propTypes;

export default MenuBox;
