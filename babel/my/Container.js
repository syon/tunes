import React from 'react';
import AppBar from 'material-ui/AppBar';
import Sound from 'react-sound';
import SoundPlayer from './SoundPlayer';
import TrackBox from './TrackBox';

const propTypes = {
  setId: React.PropTypes.string,
  album: React.PropTypes.object,
};

class Container extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      track: {},
      status: Sound.status.STOPPED,
    };
  }

  handleSelect(track) {
    this.controlSoundPlayer(this.state.track, track);
  }

  controlSoundPlayer(oldTrack, newTrack) {
    if (oldTrack.id !== newTrack.id) {
      this.setState({
        track: newTrack,
        status: Sound.status.PLAYING,
      });
    } else {
      if (this.state.status === Sound.status.STOPPED
       || this.state.status === Sound.status.PAUSED) {
        this.setState({ status: Sound.status.PLAYING });
      } else {
        this.setState({ status: Sound.status.PAUSED });
      }
    }
  }

  render() {
    const style = {
      paddingLeft: 256,
    };
    return (
      <div style={style}>
        <AppBar title={this.state.track.title} />
        <SoundPlayer
          track={this.state.track}
          status={this.state.status}
        />
        <TrackBox
          setId={this.props.setId}
          album={this.props.album}
          select={this.handleSelect}
        />
      </div>
    );
  }
}

Container.propTypes = propTypes;

export default Container;
