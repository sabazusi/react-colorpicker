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
          width={300}
          height={300}
          invertY
          styles={{backgroundColor: '#f00'}}
        />
        <span
          style={{
            width: 3,
            height: 3,
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
      default="ff0000"
    />
  ))
  .add('draggable panel', () => (
    <Draggable />
  ));
