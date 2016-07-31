import React from 'react';
import _ from 'lodash';
import Drawer from 'material-ui/Drawer';
import Logo from './Logo';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
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
      sidemenu: {
        backgroundColor: '#1812A8',
      },
    };
    _.each(this.props.structure, (grp) => {
      nodes.push(<Divider />);
      nodes.push(<Subheader>{grp.group_id}</Subheader>);
      _.each(grp.listset, (album) => {
        nodes.push(
          <AlbumItem
            key={`${grp.group_id}${album.id}`}
            album={album}
            toAaaa={this.handleClick}
            style={styles.menuitem}
          />
        );
      });
    });
    return (
      <Drawer>
        <Logo />
        <div style={styles.sidemenu}>
          {nodes}
        </div>
      </Drawer>
    );
  }
}

MenuBox.propTypes = propTypes;

export default MenuBox;
