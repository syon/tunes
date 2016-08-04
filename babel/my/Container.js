import React from 'react';
import AppBar from 'material-ui/AppBar';
import Sound from 'react-sound';
import TrackBox from './TrackBox';
import RightDrawer from './RightDrawer';

const propTypes = {
  setId: React.PropTypes.string,
  album: React.PropTypes.object,
};

class Container extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);
    this.controlSoundStatus = this.controlSoundStatus.bind(this);
    this.controlPlayStatus = this.controlPlayStatus.bind(this);

    this.state = {
      track: {},
      status: Sound.status.STOPPED,
      playingId: '',
    };
  }

  handleSelect(track) {
    this.controlSoundStatus(this.state.track, track);
    this.setState({
      playingId: track.id,
    });
  }

  controlSoundStatus(oldTrack, newTrack) {
    if (oldTrack.id !== newTrack.id) {
      this.setState({ track: newTrack });
      this.controlPlayStatus(Sound.status.PLAYING);
    } else {
      if (this.state.status === Sound.status.STOPPED
       || this.state.status === Sound.status.PAUSED) {
        this.controlPlayStatus(Sound.status.PLAYING);
      } else {
        this.controlPlayStatus(Sound.status.PAUSED);
      }
    }
  }

  controlPlayStatus(arg) {
    this.setState({ status: arg });
  }

  render() {
    const styles = {
      wrap: {
        paddingLeft: 256,
      },
      fixed: {
        position: 'fixed',
        top: 0,
        zIndex: 1,
        width: '100%',
        backgroundColor: 'rgb(72, 72, 72)',
      },
      trackbox: {
        marginTop: 64 - 8,
        backgroundImage: 'url(/assets/sono.png)',
        backgroundSize: 'cover',
      },
    };
    return (
      <div style={styles.wrap}>
        <div style={styles.fixed}>
          <AppBar title={this.props.album.listname} />
        </div>
        <div style={styles.trackbox}>
          <TrackBox
            setId={this.props.setId}
            album={this.props.album}
            select={this.handleSelect}
            playingId={this.state.playingId}
          />
        </div>
        <RightDrawer
          track={this.state.track}
          status={this.state.status}
          controlPlayStatus={this.controlPlayStatus}
        />
      </div>
    );
  }
}

Container.propTypes = propTypes;

export default Container;
