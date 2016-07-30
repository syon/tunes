import React from 'react';
import _ from 'lodash';
import Drawer from 'material-ui/Drawer';
import AlbumItem from './AlbumItem';

const propTypes = {
  structure: React.PropTypes.array,
  toOya: React.PropTypes.func,
};

class MenuBox extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(a) {
    this.props.toOya(a);
  }

  render() {
    const nodes = [];
    _.each(this.props.structure, (m) => {
      _.each(m.listset, (t) => {
        nodes.push(
          <AlbumItem id={t.id} track={t} toAaaa={this.handleClick} />
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
