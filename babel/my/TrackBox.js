import React from 'react';
import _ from 'lodash';
import TrackItem from './TrackItem';

const propTypes = {
  setId: React.PropTypes.string,
  album: React.PropTypes.object,
  select: React.PropTypes.object,
};

class TrackBox extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      thumbed: false,
      data: [],
    };
  }

  handleClick(track) {
    this.props.select(track);
  }

  render() {
    const tracks = this.props.album.tracks;
    let nodes = [];
    _.each(tracks, (t) => {
      nodes.push(
        <TrackItem track={t} select={this.handleClick} />
      );
    });
    return (
      <div>
        {nodes}
      </div>
    );
  }
}

TrackBox.propTypes = propTypes;

export default TrackBox;
