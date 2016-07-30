import React from 'react';
import MenuItem from 'material-ui/MenuItem';

const propTypes = {
  track: React.PropTypes.object,
  toAaaa: React.PropTypes.func,
};

class AlbumItem extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.toAaaa(this.props.track.id);
  }

  render() {
    const t = this.props.track;
    return (
      <MenuItem onTouchTap={this.handleClick}>
        {t.listname}
      </MenuItem>
    );
  }
}

AlbumItem.propTypes = propTypes;

export default AlbumItem;
