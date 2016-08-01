import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Sound from 'react-sound';
import SoundPlayer from './SoundPlayer';
import TrackBox from './TrackBox';
import RaisedButton from 'material-ui/RaisedButton';

const propTypes = {
  setId: React.PropTypes.string,
  album: React.PropTypes.object,
};

class Container extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);
    this.controlSoundPlayer = this.controlSoundPlayer.bind(this);
    this.controlPlayStatus = this.controlPlayStatus.bind(this);
    this.handleRightToggle = this.handleRightToggle.bind(this);

    this.state = {
      track: {},
      status: Sound.status.STOPPED,
      rightOpen: true,
    };
  }

  handleSelect(track) {
    this.controlSoundPlayer(this.state.track, track);
  }

  controlSoundPlayer(oldTrack, newTrack) {
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

  handleRightToggle() {
    this.setState({ rightOpen: !this.state.rightOpen });
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
      appbar: {
        backgroundColor: 'rgb(7, 5, 98)',
      },
      trackbox: {
        marginTop: 64 - 8,
        backgroundImage: 'url(/assets/sono.png)',
        backgroundSize: 'cover',
      },
      drawer: {
        background: 'linear-gradient(rgba(1, 1, 75, .4), rgba(24, 18, 168, .4))',
      },
    };
    return (
      <div style={styles.wrap}>
        <div style={styles.fixed}>
          <AppBar
            title={this.props.album.listname}
            style={styles.appbar}
            titleStyle={{ color: '#fff' }}
          />
        </div>
        <div style={styles.trackbox}>
          <TrackBox
            setId={this.props.setId}
            album={this.props.album}
            select={this.handleSelect}
          />
        </div>
        <RaisedButton
          label="Toggle Drawer"
          onTouchTap={this.handleRightToggle}
        />
        <Drawer
          width={512}
          openSecondary
          open={this.state.rightOpen}
          containerStyle={styles.drawer}
        >
          <AppBar
            title={this.state.track.title}
            showMenuIconButton={false}
            style={styles.appbar}
            titleStyle={{ color: '#fff' }}
          />
          <SoundPlayer
            track={this.state.track}
            status={this.state.status}
            controlPlayStatus={this.controlPlayStatus}
          />
        </Drawer>
      </div>
    );
  }
}

Container.propTypes = propTypes;

export default Container;
