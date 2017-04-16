// @flow

import React from 'react';
import Color from 'color';

type Props = {
  defaultColor: string;
};

type State = {
  hsv: {
    h: number;
    s: number;
    v: number;
  }
};

export default class ReactColorPicker extends React.Component<void, Props, State> {
  state: State;
  constructor() {
    super();
    this.state = {
      isDragging: false,
      hsv: {
        h: 0,
        s: 0,
        v: 0
      }
    };
  }

  onMouseMove = (e: MouseEvent) => {
    if (this.state.isDragging) {
      const hsv = {
        s: parseInt(100 * e.nativeEvent.offsetX / 300, 10),
        v: parseInt(100 * (300 - e.nativeEvent.offsetY) / 300, 10)
      }
      this.setState({
        hsv: Object.assign({}, this.state.hsv, hsv)
      });
    }
  };

  onClickPallet = (e: Event) => {
    const hsv = {
      s: parseInt(100 * e.nativeEvent.offsetX / 300, 10),
      v: parseInt(100 * (300 - e.nativeEvent.offsetY) / 300, 10)
    }
    this.setState({
      hsv: Object.assign({}, this.state.hsv, hsv)
    });
  }

  render() {
    const {hsv} = this.state;
    const color = Color(hsv).hsl().color;
    return (
      <div>
        <div
          style={{
            width: 50,
            height: 50,
            backgroundColor: `hsl(${color[0]}, ${color[1]}%, ${color[2]}%)`,
            userSelect: 'none'
          }}
        />
        <div
          onClick={this.onClickPallet}
          onMouseDown={() => this.setState({ isDragging: true })}
          onMouseMove={this.onMouseMove}
          onMouseUp={() => this.setState({ isDragging: false })}
          onMouseOut={() => this.setState({ isDragging: false })}
          style={{
            position: 'relative',
            overflow: 'hidden',
            cursor: 'pointer',
            width: 300,
            height: 300,
            backgroundColor: '#f00'
          }
        }>
          <span
            style={{
              position: 'absolute',
              display: 'block',
              left: (300 * hsv.s / 100) - 3,
              bottom: (300 * hsv.v / 100) - 3,
              width: 6,
              height: 6,
              pointerEvents: 'none',
              border: '1px solid #000'
            }}
          />
          <div style={{
            width: 300,
            height: 300,
            background: 'linear-gradient(to right, #fff, rgba(204,154,129,0))'
          }}>
            <div style={{
              width: 300,
              height: 300,
              background: 'linear-gradient(to top, #000, rgba(204,154,129,0))'
            }} />
          </div>
        </div>
        <div
          style={{
            cursor: 'pointer',
            width: 300,
            height: 40,
            background: 'linear-gradient(to right, #ff0000 0%, #ff9900 10%, #cdff00 20%, #35ff00 30%, #00ff66 40%, #00fffd 50%, #0066ff 60%, #3200ff 70%, #cd00ff 80%, #ff0099 90%, #ff0000 100%)'
          }}
        />
      </div>
    );
  }
}
