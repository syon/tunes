import React from 'react';
import Sound from 'react-sound';
import AppBar from 'material-ui/AppBar';
import TrackBox from './TrackBox';

const propTypes = {
  setId: React.PropTypes.string,
  album: React.PropTypes.object,
};

class Container extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);
    this.handleSongPlaying = this.handleSongPlaying.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handleStop = this.handleStop.bind(this);

    this.state = {
      track: {},
      url: '',
      status: Sound.status.STOPPED,
    };
  }

  handleSelect(track) {
    this.setState({
      track,
      url: `http://oto-no-sono.com${track.filepath}`,
    });
    if (this.state.status === Sound.status.PLAYING) {
      this.setState({ status: Sound.status.PAUSED });
    } else {
      this.setState({ status: Sound.status.PLAYING });
    }
    console.log(this.state.status);
  }

  handleSongPlaying(a) {
    console.log(Math.round(a.position/1000), a.duration);
  }

  handlePlay() {
    this.setState({ status: Sound.status.PLAYING });
  }

  handleStop() {
    this.setState({ status: Sound.status.STOPPED });
  }

  render() {
    const style = {
      paddingLeft: 256,
    };
    return (
      <div style={style}>
        <AppBar title={this.state.track.title} />
        <Sound
          url={this.state.url}
          playStatus={this.state.status}
          playFromPosition={300}
          onLoading={this.handleSongLoading}
          onPlaying={this.handleSongPlaying}
          onFinishedPlaying={this.handleSongFinishedPlaying}
        />
        <button onClick={this.handlePlay}>PLAY</button>
        <button onClick={this.handleStop}>STOP</button>
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
