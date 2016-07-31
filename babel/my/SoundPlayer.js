import React from 'react';
import Sound from 'react-sound';

const propTypes = {
  track: React.PropTypes.object,
  status: React.PropTypes.string,
};

class SoundPlayer extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleSongPlaying = this.handleSongPlaying.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handleStop = this.handleStop.bind(this);

    this.state = {
      thumbed: false,
      data: [],
    };
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
    return (
      <div>
        <Sound
          url={`http://oto-no-sono.com${this.props.track.filepath}`}
          playStatus={this.props.status}
          playFromPosition={300}
          onLoading={this.handleSongLoading}
          onPlaying={this.handleSongPlaying}
          onFinishedPlaying={this.handleSongFinishedPlaying}
        />
        <button onClick={this.handlePlay}>PLAY</button>
        <button onClick={this.handleStop}>STOP</button>
      </div>
    );
  }
}

SoundPlayer.propTypes = propTypes;

export default SoundPlayer;
