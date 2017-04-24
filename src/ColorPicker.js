// @flow

import React from 'react';
import Color from 'color';
import Pallet from './Pallet';
import HueBar from './HueBar';

type Props = {
  defaultColor?: *;
  pallet: {
    width: number;
    height: number;
    pointerClassName?: string;
  };
  hueBar: {
    width: number;
    height: number;
    pointerClassName?: string;
  };
  onChange: (color: string) => void;
};

type State = {
  hsv: {
    h: number;
    s: number;
    v: number;
  }
};

type DefaultProps = Props;

export default class ColorPicker extends React.Component<DefaultProps, Props, State> {
  state: State;
  static defaultProps = {
    onChange: (color: string) => console.log(color),
    pallet: {
      width: 200,
      height: 200
    },
    hueBar: {
      width: 200,
      height: 200
    }
  };

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

  onChangePalletPoint = (s: number, v: number) => {
    this.setState({
      hsv: Object.assign({}, this.state.hsv, { s, v })
    });
  };

  onChangeHueValue = (h: number) => {
    this.setState({
      hsv: Object.assign({}, this.state.hsv, { h })
    });
  };

  componentDidMount() {
    const color =  Color(this.props.defaultColor);
    if (color) this.setState({
      hsv: color.hsv().object()
    })
  }

  render() {
    const {
      pallet,
      hueBar
    } = this.props;
    const { hsv } = this.state;
    return (
      <div>
        <Pallet
          onChange={this.onChangePalletPoint}
          hsv={hsv}
          {...pallet}
        />
        <HueBar
          onChange={this.onChangeHueValue}
          hue={hsv.h}
          {...hueBar}
        />
      </div>
    );
  }
}
