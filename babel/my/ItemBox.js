import React from 'react';
import _ from 'lodash';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import PlayArrow from 'material-ui/svg-icons/av/play-arrow';

const propTypes = {
  setId: React.PropTypes.string,
  album: React.PropTypes.object,
  select: React.PropTypes.object,
};

class ItemBox extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      thumbed: false,
      data: [],
    };
  }

  handleClick() {
    this.props.select(this.props.album.tracks[0]);
  }

  render() {
    const tracks = this.props.album.tracks;
    let nodes = [];
    const styles = {
      wrap: {
        display: 'flex',
        alignItems: 'center',
      },
    };
    _.each(tracks, (t) => {
      nodes.push(
        <div key={t.id} style={styles.wrap}>
          <FloatingActionButton mini onClick={this.handleClick}>
            <PlayArrow />
          </FloatingActionButton>
          <h4>{t.title}</h4>
        </div>
      );
    });
    return (
      <div className="itemBox">
        {nodes}
      </div>
    );
  }
}

ItemBox.propTypes = propTypes;

export default ItemBox;
