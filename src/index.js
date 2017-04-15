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
      hsv: {
        h: 0,
        s: 0,
        v: 0
      }
    };
  }

  getStyle() {
    return {
    };
  }

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
            backgroundColor: `hsl(${color[0]}, ${color[1]}%, ${color[2]}%)`
          }}
        />
        <div
          onClick={this.onClickPallet}
          style={{
            cursor: 'pointer',
            width: 300,
            height: 300,
            backgroundColor: '#f00'
          }
        }>
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
