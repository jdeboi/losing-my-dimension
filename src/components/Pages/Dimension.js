import React from 'react';
import Frame from '../App/Frame'

function Dimension() {
  return (
    <div className="Dimension">
      <h1>Dimension</h1>

      <Frame title="title" content={<div><h1>Some String</h1></div>} width="200px" height="200px" />
    </div>
  );
}

export default Dimension;
