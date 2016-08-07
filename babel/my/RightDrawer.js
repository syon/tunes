import React from 'react';
import Sound from 'react-sound';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
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

  render() {
    const styles = {
      appbar: {
        backgroundColor: 'rgb(7, 5, 98)',
      },
      drawer: {
        backgroundColor: 'rgba(20, 20, 56, 0.5)',
      },
      listitemInner: {
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
        width={384}
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
          titleStyle={{ color: '#fff' }}
        />
        <SoundPlayer
          track={this.props.track}
          status={this.props.status}
          controlPlayStatus={this.props.controlPlayStatus}
        />
        <List>
          <Subheader>ANDY's comment:</Subheader>
          <ListItem
            leftAvatar={<Avatar src="/assets/mojiro.jpg" />}
            primaryText={this.props.track.desc}
            innerDivStyle={styles.listitemInner}
          />
        </List>
        <div style={styles.download}>
          <RaisedButton
            label="ダウンロード"
            href={`/download/${this.props.track.id}.html`}
            secondary
            style={styles.button}
            icon={<FileDownload />}
            target="_blank"
          />
        </div>
      </Drawer>
    );
  }
}

RightDrawer.propTypes = propTypes;

export default RightDrawer;
