import React from 'react';
import Sound from 'react-sound';
import Slider from 'material-ui/Slider';

const propTypes = {
  track: React.PropTypes.object,
  status: React.PropTypes.string,
  controlPlayStatus: React.PropTypes.func,
};

class SoundPlayer extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleSongPlaying = this.handleSongPlaying.bind(this);
    this.handleSliderChange = this.handleSliderChange.bind(this);
    this.calcElapse = this.calcElapse.bind(this);
    this.calcRemain = this.calcRemain.bind(this);

    this.state = {
      status: Sound.status.STOPPED,
      ing: {},
      fromPosition: 0,
      duration: 0,
      progress: 0,
    };
  }

  handleSongPlaying(ing) {
    // console.log(`★ ${a.position} / ${a.duration}`);
    this.setState({
      ing,
      duration: ing.duration,
      progress: ing.position / ing.duration,
    });
  }

  handleSliderChange(event, rate) {
    this.setState({ fromPosition: rate * this.state.duration });
  }

  formatTime(millisec) {
    if (isNaN(millisec) || millisec < 0) {
      return '--:--';
    }
    const all = Math.floor(millisec / 1000);
    const sec = all % 60;
    const min = (all - sec) / 60;
    const sec00 = `00${sec}`.slice(-2);
    return `${min}:${sec00}`;
  }

  calcElapse() {
    return this.formatTime(this.state.ing.position);
  }

  calcRemain() {
    const rem = this.state.duration - this.state.ing.position;
    return `-${this.formatTime(rem)}`;
  }

  render() {
    const elapse = this.calcElapse();
    const remain = this.calcRemain();
    const styles = {
      current: {
        padding: '16px',
      },
      elarem: {
        display: 'flex',
        justifyContent: 'space-between',
      },
      slider: {
        margin: '6px 0',
      },
    };
    return (
      <div>
        <Sound
          url={`http://oto-no-sono.com${this.props.track.filepath}`}
          playStatus={this.props.status}
          playFromPosition={this.state.fromPosition}
          onLoading={this.handleSongLoading}
          onPlaying={this.handleSongPlaying}
          onFinishedPlaying={this.handleSongFinishedPlaying}
        />
        <div style={styles.current}>
          <div style={styles.elarem}>
            <span>{elapse}</span>
            <span>{remain}</span>
          </div>
          <Slider
            value={this.state.progress}
            onChange={this.handleSliderChange}
            sliderStyle={styles.slider}
          />
        </div>
      </div>
    );
  }
}

SoundPlayer.propTypes = propTypes;

export default SoundPlayer;
