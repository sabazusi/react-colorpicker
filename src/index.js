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

  render() {
    return (
      <div style={{
        width: 300,
        height: 300,
        backgroundColor: '#f00'
      }}>
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
