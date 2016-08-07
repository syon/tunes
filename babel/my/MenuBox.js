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

  handleClick(a) {
    this.props.clickMenu(a);
  }

  handleReqChg(open) {
    this.props.controlMenuOpen(open);
  }

  render() {
    const nodes = [];
    const styles = {
      sidemenu: {
        backgroundColor: '#1812A8',
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
    _.each(this.props.structure, (grp) => {
      let grpCnt = '';
      if (grp.group_id === 'albums') {
        grpCnt = grp.group_count;
      }
      nodes.push(<Divider />);
      nodes.push(
        <Subheader style={styles.subheader}>
          <span>{grp.group_id}</span>
          <span>{grpCnt}</span>
        </Subheader>
      );
      _.each(grp.listset, (album) => {
        nodes.push(
          <ListItem innerDivStyle={styles.listitem}>
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
