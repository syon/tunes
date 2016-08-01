import React from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import SoundPlayer from './SoundPlayer';
import FileDownload from 'material-ui/svg-icons/file/file-download';

const propTypes = {
  track: React.PropTypes.object,
  status: React.PropTypes.string,
};

class RightDrawer extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      rightOpen: true,
    };
  }

  render() {
    const styles = {
      appbar: {
        backgroundColor: 'rgb(7, 5, 98)',
      },
      drawer: {
        backgroundColor: 'rgba(20, 20, 56, 0.5)',
      },
    };
    return (
      <Drawer
        width={384}
        openSecondary
        open={this.state.rightOpen}
        containerStyle={styles.drawer}
      >
        <AppBar
          title={this.props.track.title}
          showMenuIconButton={false}
          style={styles.appbar}
          titleStyle={{ color: '#fff' }}
        />
        <SoundPlayer
          track={this.props.track}
          status={this.props.status}
          controlPlayStatus={this.controlPlayStatus}
        />
        <List>
          <Subheader>ANDY's comment:</Subheader>
          <ListItem
            leftAvatar={<Avatar src="/assets/logo.png" />}
            primaryText={this.props.track.desc}
          />
        </List>
        <RaisedButton
          label="ダウンロード"
          href={`/download/${this.props.track.id}.html`}
          secondary
          style={styles.button}
          icon={<FileDownload />}
          target="_blank"
        />
      </Drawer>
    );
  }
}

RightDrawer.propTypes = propTypes;

export default RightDrawer;
