import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

class ItemBox extends React.Component {
  constructor(props, context) {
    super(props, context);

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

  render() {
    const menus = this.state.structure;
    let nodes = [];
    _.each(menus, (m) => {
      _.each(m.listset, (l) => {
        nodes.push(<MenuItem>{l.listname}</MenuItem>);
      });
    });

    return (
      <Drawer>
        {nodes}
      </Drawer>
    );
  }
}

export default ItemBox;
