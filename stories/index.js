import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import ColorPicker from '../src/index';
import DraggablePanel from '../src/DraggablePanel';

class Draggable extends React.Component {
  constructor() {
    super();
    this.state = {
      x: 0,
      y: 0
    }
  }
  render() {
    return (
      <div style={{position: 'relative'}}>
        <DraggablePanel
          onChangePosition={(x, y) => this.setState({x, y})}
          invertY
          max={{
            x: 299,
            y: 299
          }}
          min={{
            x: 0,
            y: 0
          }}
          styles={{
            width:300,
            height:300,
            backgroundColor: '#f00'
          }}
        />
        <span
          style={{
            width: 1,
            height: 1,
            position: 'absolute',
            left: this.state.x,
            bottom: this.state.y,
            backgroundColor: "#00f"
          }}
        />
      </div>
    );
  }
}

storiesOf('ColorPicker', module)
  .add('default: #ff0000', () => (
    <ColorPicker
      defaultColor="blue"
    />
  ))
  .add('draggable panel', () => (
    <Draggable />
  ));
