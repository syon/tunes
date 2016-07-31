import React from 'react';

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
        display: 'flex',
        justifyContent: 'space-between',
        fontWeight: 'bold',
        padding: '0px 16px',
        lineHeight: '48px',
        transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
        whiteSpace: 'nowrap',
      },
    };
    return (
      <div onClick={this.handleClick} style={styles.menuitem}>
        <div>{a.listname}</div>
        <div>{a.count}</div>
      </div>
    );
  }
}

AlbumItem.propTypes = propTypes;

export default AlbumItem;
