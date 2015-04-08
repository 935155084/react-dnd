'use strict';

import React, { PropTypes, Component } from 'react';
import { configureDragDrop } from 'react-dnd';

const style = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem',
  margin: '0.5rem',
  maxWidth: 80,
  float: 'left'
};

const propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  dragSourceRef: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  isDropped: PropTypes.bool.isRequired
};

class Box extends Component {
  render() {
    const { name, isDropped, isDragging, dragSourceRef } = this.props;
    const opacity = isDragging ? 0.4 : 1;

    return (
      <div ref={dragSourceRef}
           style={{ ...style, opacity }}>
        {isDropped ?
          <s>{name}</s> :
          name
        }
      </div>
    );
  }
}
Box.propTypes = propTypes;

const boxSource = {
  beginDrag(props) {
    return {
      name: props.name
    };
  }
};

export default configureDragDrop(Box, {
  configure: (register, props) =>
    register.dragSource(props.type, boxSource),

  collect: (connect, monitor, dragSourceId) => ({
    dragSourceRef: connect.dragSource(dragSourceId),
    isDragging: monitor.isDragging(dragSourceId)
  })
});