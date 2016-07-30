import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import PlayArrow from 'material-ui/svg-icons/av/play-arrow';

const propTypes = {
  setId: React.PropTypes.string,
  album: React.PropTypes.object,
};

class ItemBox extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      thumbed: false,
      data: [],
    };
  }

  componentDidMount() {
    // this.loadFromServer();
  }

  loadFromServer() {
    axios.get(`/tracklists/${this.props.setId}.json`)
      .then((response) => {
        this.setState({ data: response.data });
      })
      .catch((response) => {
        console.error('/retrieve', response);
      });
  }

  render() {
    const tracks = this.props.album.tracks;
    let nodes = [];
    const styles = {
      wrap: {
        display: 'flex',
        alignItems: 'center',
      },
    };
    _.each(tracks, (t) => {
      nodes.push(
        <div key={t.id} style={styles.wrap}>
          <FloatingActionButton mini>
            <PlayArrow />
          </FloatingActionButton>
          <h4>{t.title}</h4>
        </div>
      );
    });
    return (
      <div className="itemBox">
        {nodes}
      </div>
    );
  }
}

ItemBox.propTypes = propTypes;

export default ItemBox;
