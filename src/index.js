// @flow

import React from 'react';
import Color from 'color';

import DraggablePanel from './DraggablePanel';

type Props = {
  defaultColor: *;
};

type State = {
  isDragging: boolean;
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

  componentDidMount() {
    const color =  Color(this.props.defaultColor);
    if (color) {
      this.setState({
        hsv: color.hsv().object()
      })
    }
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
  };

  onClickHueBar = (e: Event) => {
    this.setState({
      hsv: Object.assign({}, this.state.hsv, {
        h: parseInt( 360 * e.nativeEvent.offsetX / 300, 10)
      })
    });
  };


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
          style={{
            position: 'relative',
            overflow: 'hidden',
            cursor: 'pointer',
            width: 300,
            height: 300,
            backgroundColor: `${Color({h:hsv.h, s:100, v: 100}).rgb().string()}`
          }}
        >
          <span
            style={{
              position: 'absolute',
              display: 'block',
              left: (300 * hsv.s / 100) - 2,
              bottom: (300 * hsv.v / 100) - 2,
              width: 4,
              height: 4,
              pointerEvents: 'none',
              border: '2px solid #fff'
            }}
          />
          <DraggablePanel
            onChangePosition={(x, y) => this.setState({hsv: Object.assign({}, hsv, {s: x, v: y})})}
            invertY
            max={{
              x: 100,
              y: 100
            }}
            min={{
              x: 0,
              y: 0
            }}
            styles={{
              width: 300,
              height: 300,
              backgroundColor: `${Color({h:hsv.h, s:100, v: 100}).rgb().string()}`
            }}
          >
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
          </DraggablePanel>
        </div>

        <div
          style={{
            cursor: 'pointer',
            position: 'relative',
            width: 300,
            height: 40,
            //overflow: 'hidden',
            background: 'linear-gradient(to right, #ff0000 0%, #ff9900 10%, #cdff00 20%, #35ff00 30%, #00ff66 40%, #00fffd 50%, #0066ff 60%, #3200ff 70%, #cd00ff 80%, #ff0099 90%, #ff0000 100%)'
          }}
        >
          <span
            style={{
              left: Math.min(300 * hsv.h / 360, 299),
              position: 'absolute',
              width: 1,
              height: 36,
              pointerEvents: 'none',
              backgroundColor: '#000'
            }}
          />
          <DraggablePanel
            onChangePosition={(x, y) => this.setState({hsv: Object.assign({}, hsv, {h: x})})}
            max={{
              x: 360,
              y: 0
            }}
            min={{
              x: 0,
              y: 0
            }}
            styles={{
              width: 300,
              height: 40,
              background: 'linear-gradient(to right, #ff0000 0%, #ff9900 10%, #cdff00 20%, #35ff00 30%, #00ff66 40%, #00fffd 50%, #0066ff 60%, #3200ff 70%, #cd00ff 80%, #ff0099 90%, #ff0000 100%)'
            }}
          />
        </div>
      </div>
    );
  }
}
