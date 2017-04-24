// @flow

import React from 'react';
import Color from 'color';
import Pallet from './Pallet';
import HueBar from './HueBar';

type PickedColor = {
  hsv: {
    h: number;
    s: number;
    v: number;
  },
  rgb: {
    r: number;
    g: number;
    b: number;
  }
};

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
  onChange: (color: PickedColor) => void;
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
    onChange: (color: PickedColor) => console.log(color),
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

  changeColor = () => {
    const color = Color(this.state.hsv);
    this.props.onChange({
      hsv: color.hsv().object(),
      rgb: color.rgb().object()
    });
  }

  onChangePalletPoint = (s: number, v: number) => {
    this.setState({
      hsv: Object.assign({}, this.state.hsv, { s, v })
    }, () => this.changeColor());
  };

  onChangeHueValue = (h: number) => {
    this.setState({
      hsv: Object.assign({}, this.state.hsv, { h })
    }, () => this.changeColor());
  };

  componentDidMount() {
    const color =  Color(this.props.defaultColor || 'red');
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
