import React from 'react';

const propTypes = {
  album: React.PropTypes.object,
  select: React.PropTypes.func,
};

class AlbumItem extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.select(this.props.album.id);
  }

  render() {
    const a = this.props.album;
    const styles = {
      menuitem: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '16px',
      },
    };
    return (
      <div onClick={this.handleClick} style={styles.menuitem}>
        <div>{a.nm}</div>
        <div>{a.count}</div>
      </div>
    );
  }
}

AlbumItem.propTypes = propTypes;

export default AlbumItem;
