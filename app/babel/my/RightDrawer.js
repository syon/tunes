import React from 'react';
import Sound from 'react-sound';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import SoundPlayer from './SoundPlayer';
import FileDownload from 'material-ui/svg-icons/file/file-download';
import PlayArrow from 'material-ui/svg-icons/av/play-arrow';
import Pause from 'material-ui/svg-icons/av/pause';

const propTypes = {
  track: React.PropTypes.object,
  status: React.PropTypes.string,
  controlPlayStatus: React.PropTypes.func,
  playingId: React.PropTypes.string,
  isDocked: React.PropTypes.bool,
  isOpened: React.PropTypes.bool,
  controlDrawerOpen: React.PropTypes.func,
};

class RightDrawer extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handlePlay = this.handlePlay.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleReqChg = this.handleReqChg.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
  }

  handlePlay() {
    this.props.controlPlayStatus(Sound.status.PLAYING);
  }

  handlePause() {
    this.props.controlPlayStatus(Sound.status.PAUSED);
  }

  handleReqChg(open) {
    this.props.controlDrawerOpen(open);
  }

  handleDownload() {
    this.props.controlPlayStatus(Sound.status.PAUSED);
  }

  render() {
    const styles = {
      appbar: {
        // backgroundColor: 'rgb(7, 5, 98)',
      },
      drawer: {
        backgroundColor: 'hsla(240,17%,90%,0.1)',
      },
      commentHead: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
      },
      commentAvatar: {
        marginRight: '16px',
      },
      commentText: {
        marginTop: '0',
        padding: '16px',
        lineHeight: '1.4',
        fontSize: '14px',
      },
      download: {
        display: 'flex',
        justifyContent: 'center',
      },
    };
    let iel = (
      <IconButton onClick={this.handlePlay}><PlayArrow /></IconButton>
    );
    if (this.props.playingId === this.props.track.id
        && this.props.status === Sound.status.PLAYING) {
      iel = (
        <IconButton onClick={this.handlePause}><Pause /></IconButton>
      );
    }
    return (
      <Drawer
        width={300}
        openSecondary
        open={this.props.isOpened}
        containerStyle={styles.drawer}
        docked={this.props.isDocked}
        onRequestChange={this.handleReqChg}
      >
        <AppBar
          title={this.props.track.title}
          iconElementLeft={iel}
          style={styles.appbar}
        />
        <SoundPlayer
          track={this.props.track}
          status={this.props.status}
          controlPlayStatus={this.props.controlPlayStatus}
        />
        <div>
          <div style={styles.commentHead}>
            <Avatar src="/assets/img/mojiro.jpg" style={styles.commentAvatar} />
            <span>{'ANDY\'s comment:'}</span>
          </div>
          <p style={styles.commentText}>{this.props.track.desc}</p>
        </div>
        <div style={styles.download}>
          <RaisedButton
            label="ダウンロード"
            href={`/download/${this.props.track.id}.html`}
            secondary
            style={styles.button}
            icon={<FileDownload />}
            target="_blank"
            disabled={!this.props.track.id}
            onTouchTap={this.handleDownload}
          />
        </div>
      </Drawer>
    );
  }
}

RightDrawer.propTypes = propTypes;

export default RightDrawer;
