import React from 'react';

const Cursor = ({ offsetLeft, left }) =>{
  return <span style={{ left: offsetLeft + left }} className="blinking-cursor"></span>
}

export default Cursor
