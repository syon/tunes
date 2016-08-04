import React from 'react';
import _ from 'lodash';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import PlayArrow from 'material-ui/svg-icons/av/play-arrow';
import Pause from 'material-ui/svg-icons/av/pause';
import Chip from 'material-ui/Chip';

const propTypes = {
  track: React.PropTypes.object,
  select: React.PropTypes.func,
  isPlaying: React.PropTypes.bool,
};

class TrackItem extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);

    this.state = {
    };
  }

  handleClick() {
    this.props.select(this.props.track);
  }

  render() {
    const t = this.props.track;
    const styles = {
      wrap: {
        display: 'flex',
        alignItems: 'center',
        padding: '8px 16px',
      },
      trackinfo: {
        flexGrow: '1',
        paddingLeft: '1em',
      },
      tags: {
        display: 'flex',
      },
      chip: {
        marginRight: '6px',
      },
      chipInner: {
        fontSize: '12px',
        lineHeight: '24px',
      },
    };
    let tags = [];
    _.each(t.tags, (tag) => {
      tags.push(
        <Chip style={styles.chip} labelStyle={styles.chipInner}>
          {tag}
        </Chip>
      );
    });
    let fabIcon = this.props.isPlaying ? <Pause /> : <PlayArrow />;
    let fabClass = this.props.isPlaying ? 'playing' : '';
    return (
      <div onClick={this.handleClick} style={styles.wrap}>
        <FloatingActionButton
          mini
          className={fabClass}
          onClick={this.handleClick}
        >
          {fabIcon}
        </FloatingActionButton>
        <div style={styles.trackinfo}>
          <h3>{t.title}</h3>
          <div style={styles.tags}>
            {tags}
          </div>
        </div>
      </div>
    );
  }
}

TrackItem.propTypes = propTypes;

export default TrackItem;
