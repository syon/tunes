import React from 'react';
import MenuItem from 'material-ui/MenuItem';

const propTypes = {
  album: React.PropTypes.object,
  toAaaa: React.PropTypes.func,
};

class AlbumItem extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.toAaaa(this.props.album.id);
  }

  render() {
    const a = this.props.album;
    const styles = {
      menuitem: {
        fontWeight: 'bold',
      },
    };
    return (
      <MenuItem key={a.id} onTouchTap={this.handleClick} style={styles.menuitem}>
        {a.listname}
      </MenuItem>
    );
  }
}

AlbumItem.propTypes = propTypes;

export default AlbumItem;
