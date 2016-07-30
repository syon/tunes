import React from 'react';
import AppBar from 'material-ui/AppBar';
import ItemBox from './ItemBox';

const propTypes = {
  setId: React.PropTypes.string,
  album: React.PropTypes.object,
};

function Container({ setId, album }) {
  const style = {
    paddingLeft: 256,
  };
  return (
    <div style={style}>
      <AppBar title="Title" />
      <ItemBox setId={setId} album={album} />
    </div>
  );
}

Container.propTypes = propTypes;

export default Container;
