import React from 'react';
import _ from 'lodash';
import { List, ListItem } from 'material-ui/List';
import TrackItem from './TrackItem';

const propTypes = {
  setId: React.PropTypes.string,
  album: React.PropTypes.object,
  select: React.PropTypes.func,
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
        <ListItem>
          <TrackItem key={t.id} track={t} select={this.handleClick} />
        </ListItem>
      );
    });
    return (
      <List>
        {nodes}
      </List>
    );
  }
}

TrackBox.propTypes = propTypes;

export default TrackBox;
