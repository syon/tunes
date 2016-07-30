import React from 'react';
import AppBar from 'material-ui/AppBar';
import ItemBox from './ItemBox';

const propTypes = {
  setId: React.PropTypes.string,
  album: React.PropTypes.object,
};

class Container extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      select: {},
    };
  }

  handleSelect(track) {
    this.setState({ select: track });
  }

  render() {
    const style = {
      paddingLeft: 256,
    };
    return (
      <div style={style}>
        <AppBar title={this.state.select.title} />
        <ItemBox
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
