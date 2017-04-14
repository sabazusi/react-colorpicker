// @flow

import React from 'react';

type Props = {
  defaultColor: string;
};

type State = {
  current: string;
};

export default class ReactColorPicker extends React.Component<void, Props, State> {
  state: State;
  constructor() {
    super();
    this.state = {
      current: 'ff0000'
    };
  }

  getStyle() {
    return {
    };
  }

  onClickPallet = (e: Event) => {
    console.log(e.nativeEvent.offsetX);
    console.log(e.nativeEvent.offsetY);
  }

  render() {
    return (
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
    );
  }
}
