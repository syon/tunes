import React from 'react';
import AppBar from 'material-ui/AppBar';
import Sound from 'react-sound';
import TrackBox from './TrackBox';
import RightDrawer from './RightDrawer';
import withWidth, { SMALL } from 'material-ui/utils/withWidth';
import MenuBox from './MenuBox';

const propTypes = {
  structure: React.PropTypes.array,
  setId: React.PropTypes.string,
  album: React.PropTypes.object,
  clickMenu: React.PropTypes.func,
  width: React.PropTypes.number,
};

class Container extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);
    this.controlSoundStatus = this.controlSoundStatus.bind(this);
    this.controlPlayStatus = this.controlPlayStatus.bind(this);
    this.controlMenuOpen = this.controlMenuOpen.bind(this);
    this.controlDrawerOpen = this.controlDrawerOpen.bind(this);
    this.handleAppbarBtn = this.handleAppbarBtn.bind(this);

    this.state = {
      track: {},
      status: Sound.status.STOPPED,
      playingId: '',
      isMenuOpened: false,
      isRightDrawerOpened: false,
    };
  }

  handleSelect(track) {
    const status = this.controlSoundStatus(this.state.track, track);
    this.setState({
      playingId: track.id,
    });
    const isWide = this.props.width > SMALL;
    let isOpened = isWide;
    if (!isWide) {
      isOpened = status === Sound.status.PLAYING;
    }
    this.controlDrawerOpen(isOpened);
  }

  controlSoundStatus(oldTrack, newTrack) {
    let result;
    if (oldTrack.id !== newTrack.id) {
      this.setState({ track: newTrack });
      result = this.controlPlayStatus(Sound.status.PLAYING);
    } else {
      if (this.state.status === Sound.status.STOPPED
       || this.state.status === Sound.status.PAUSED) {
        result = this.controlPlayStatus(Sound.status.PLAYING);
      } else {
        result = this.controlPlayStatus(Sound.status.PAUSED);
      }
    }
    return result;
  }

  controlPlayStatus(arg) {
    this.setState({ status: arg });
    return arg;
  }

  controlMenuOpen(isOpened) {
    this.setState({ isMenuOpened: isOpened });
  }

  controlDrawerOpen(isOpened) {
    this.setState({ isRightDrawerOpened: isOpened });
  }

  handleAppbarBtn() {
    this.setState({ isMenuOpened: !this.state.isMenuOpened });
  }

  render() {
    let isWide = this.props.width > SMALL;
    const styles = {
      wrap: {
        paddingLeft: isWide ? 256 : 0,
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
        <MenuBox
          structure={this.props.structure}
          clickMenu={this.props.clickMenu}
          isDocked={isWide}
          isOpened={isWide ? true : this.state.isMenuOpened}
          controlMenuOpen={this.controlMenuOpen}
        />
        <div style={styles.fixed}>
          <AppBar
            title={this.props.album.listname}
            onLeftIconButtonTouchTap={this.handleAppbarBtn}
            showMenuIconButton={!isWide}
          />
        </div>
        <div style={styles.trackbox}>
          <TrackBox
            setId={this.props.setId}
            album={this.props.album}
            select={this.handleSelect}
            playingId={this.state.playingId}
            status={this.state.status}
          />
        </div>
        <RightDrawer
          track={this.state.track}
          status={this.state.status}
          controlPlayStatus={this.controlPlayStatus}
          playingId={this.state.playingId}
          isDocked={isWide}
          isOpened={isWide ? true : this.state.isRightDrawerOpened}
          controlDrawerOpen={this.controlDrawerOpen}
        />
      </div>
    );
  }
}

Container.propTypes = propTypes;

export default withWidth()(Container);
