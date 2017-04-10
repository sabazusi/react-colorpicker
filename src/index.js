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
      current: 'ffffff'
    };
  }

  render() {
    return (
      <div>
        hogehoge
      </div>
    );
  }
}
