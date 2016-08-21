import React from 'react';
import _ from 'lodash';
import Drawer from 'material-ui/Drawer';
import Logo from './Logo';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import AlbumItem from './AlbumItem';

const propTypes = {
  structure: React.PropTypes.array,
  activeAlbumId: React.PropTypes.string,
  clickMenu: React.PropTypes.func,
  isDocked: React.PropTypes.bool,
  isOpened: React.PropTypes.bool,
  controlMenuOpen: React.PropTypes.func,
};

class MenuBox extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);
    this.handleReqChg = this.handleReqChg.bind(this);
  }

  handleClick(albumId) {
    this.props.clickMenu(albumId);
    this.props.controlMenuOpen(false);
  }

  handleReqChg(open) {
    this.props.controlMenuOpen(open);
  }

  render() {
    const nodes = [];
    const styles = {
      sidemenu: {
        backgroundColor: '#fff',
      },
      divider: {
        backgroundColor: 'rgba(0, 0, 0, 0.07)',
      },
      subheader: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingRight: 16,
      },
      listitem: {
        // click on padding area will be missed.
        padding: '0',
      },
    };
    nodes.push(<Divider style={styles.divider} />);
    nodes.push(<a href="/about.html">このサイトについて・利用規約</a>);
    _.each(this.props.structure, (grp) => {
      let grpCnt = '';
      if (grp.group_id === 'albums') {
        grpCnt = grp.group_count;
      }
      nodes.push(<Divider style={styles.divider} />);
      nodes.push(
        <Subheader style={styles.subheader}>
          <span>{grp.group_id}</span>
          <span>{grpCnt}</span>
        </Subheader>
      );
      _.each(grp.listset, (album) => {
        const isActive = album.id === this.props.activeAlbumId;
        let activeStyle = {};
        if (isActive) {
          activeStyle = { backgroundColor: 'rgba(195, 231, 249, 0.5)' };
        }
        nodes.push(
          <ListItem style={activeStyle} innerDivStyle={styles.listitem}>
            <AlbumItem
              key={`${grp.group_id}${album.id}`}
              album={album}
              select={this.handleClick}
            />
          </ListItem>
        );
      });
    });
    return (
      <Drawer
        open={this.props.isOpened}
        docked={this.props.isDocked}
        onRequestChange={this.handleReqChg}
      >
        <Logo />
        <List style={styles.sidemenu}>
          {nodes}
        </List>
      </Drawer>
    );
  }
}

MenuBox.propTypes = propTypes;

export default MenuBox;
