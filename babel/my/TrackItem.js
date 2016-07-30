import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import PlayArrow from 'material-ui/svg-icons/av/play-arrow';

const propTypes = {
  track: React.PropTypes.object,
  select: React.PropTypes.func,
};

class TrackItem extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      thumbed: false,
      data: [],
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
      },
    };
    return (
      <div key={t.id} style={styles.wrap}>
        <FloatingActionButton mini onClick={this.handleClick}>
          <PlayArrow />
        </FloatingActionButton>
        <h4>{t.title}</h4>
      </div>
    );
  }
}

TrackItem.propTypes = propTypes;

export default TrackItem;
