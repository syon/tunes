import React from 'react';
import Sound from 'react-sound';
import Slider from 'material-ui/Slider';

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
    this.handleSliderChange = this.handleSliderChange.bind(this);

    this.state = {
      status: Sound.status.STOPPED,
      position: 0,
      duration: 0,
      progress: 0,
    };
  }

  handleSongPlaying(a) {
    console.log(`★ ${a.position} / ${a.duration}`);
    this.setState({
      duration: a.duration,
      progress: a.position / a.duration,
    });
  }

  handlePlay() {
    this.setState({ status: Sound.status.PLAYING });
  }

  handleStop() {
    this.setState({ status: Sound.status.STOPPED });
  }

  handleSliderChange(event, rate) {
    this.setState({ position: rate * this.state.duration });
  }

  render() {
    return (
      <div>
        <Sound
          url={`http://oto-no-sono.com${this.props.track.filepath}`}
          playStatus={this.props.status}
          playFromPosition={this.state.position}
          onLoading={this.handleSongLoading}
          onPlaying={this.handleSongPlaying}
          onFinishedPlaying={this.handleSongFinishedPlaying}
        />
        <Slider value={this.state.progress} onChange={this.handleSliderChange} />
        <button onClick={this.handlePlay}>PLAY</button>
        <button onClick={this.handleStop}>STOP</button>
      </div>
    );
  }
}

SoundPlayer.propTypes = propTypes;

export default SoundPlayer;