import React from 'react';
import Sound from 'react-sound';
import Slider from 'material-ui/Slider';
import Popover from 'material-ui/Popover';
import FlatButton from 'material-ui/FlatButton';
import VolumeUp from 'material-ui/svg-icons/av/volume-up';

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
    this.handlePopover = this.handlePopover.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleVolume = this.handleVolume.bind(this);
    this.calcElapse = this.calcElapse.bind(this);
    this.calcRemain = this.calcRemain.bind(this);

    this.state = {
      status: Sound.status.STOPPED,
      ing: {},
      fromPosition: 0,
      duration: 0,
      progress: 0,
      volumeOpen: false,
      volume: 0.75,
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

  handlePopover(event) {
    event.preventDefault();
    this.setState({
      volumeOpen: !this.state.volumeOpen,
      anchorEl: event.currentTarget,
    });
  }

  handleRequestClose() {
    this.setState({
      volumeOpen: false,
    });
  }

  handleVolume(event, vol) {
    this.setState({ volume: vol });
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
      subCtrl: {
        display: 'flex',
        justifyContent: 'flex-end',
      },
      popover: {
        padding: '10px',
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
          volume={this.state.volume * 100}
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
        <div style={styles.subCtrl}>
          <FlatButton
            onTouchTap={this.handlePopover}
            label="Volume"
            icon={<VolumeUp />}
          />
        </div>
        <Popover
          open={this.state.volumeOpen}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.handleRequestClose}
          style={styles.popover}
        >
          <Slider
            style={{ height: 100 }}
            axis="y"
            defaultValue={this.state.volume}
            onChange={this.handleVolume}
          />
        </Popover>
      </div>
    );
  }
}

SoundPlayer.propTypes = propTypes;

export default SoundPlayer;
