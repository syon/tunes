import React from 'react';
import _ from 'lodash';
import Drawer from 'material-ui/Drawer';
import Logo from './Logo';
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
    const styles = {
      header: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      logo: {
        width: 150,
        height: 150,
        margin: '25px auto 10px',
      },
    };
    _.each(this.props.structure, (grp) => {
      _.each(grp.listset, (album) => {
        nodes.push(
          <AlbumItem
            key={`${grp.group_id}${album.id}`}
            album={album}
            toAaaa={this.handleClick}
          />
        );
      });
    });
    return (
      <Drawer>
        <Logo />
        <div>
          {nodes}
        </div>
      </Drawer>
    );
  }
}

MenuBox.propTypes = propTypes;

export default MenuBox;
