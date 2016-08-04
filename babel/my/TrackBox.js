import React from 'react';
import _ from 'lodash';
import { List, ListItem } from 'material-ui/List';
import TrackItem from './TrackItem';

const propTypes = {
  setId: React.PropTypes.string,
  album: React.PropTypes.object,
  select: React.PropTypes.func,
  playingId: React.PropTypes.string,
};

class TrackBox extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(track) {
    this.props.select(track);
  }

  render() {
    const tracks = this.props.album.tracks;
    const styles = {
      list: {
        backgroundColor: 'rgba(0,0,0,.4)',
      },
      listitem: {
        // click on padding area will be missed.
        padding: '0',
      },
    };
    let nodes = [];
    _.each(tracks, (t) => {
      const isPlaying = (t.id === this.props.playingId);
      nodes.push(
        <ListItem key={t.id} innerDivStyle={styles.listitem}>
          <TrackItem
            track={t}
            select={this.handleClick}
            isPlaying={isPlaying}
          />
        </ListItem>
      );
    });
    return (
      <List style={styles.list}>
        {nodes}
      </List>
    );
  }
}

TrackBox.propTypes = propTypes;

export default TrackBox;
