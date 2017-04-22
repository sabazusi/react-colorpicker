// @flow

import React from 'react';

type Props = {
  onChangePosition: (x: number, y: number) => void;
  width: number;
  height: number;
  invertY: boolean;
  styles: {};
};

type DefaultProps = Props;

export default class DraggablePanel extends React.Component<DefaultProps, Props, void> {
  panelRef: HTMLElement;

  static defaultProps = {
    onChangePosition: () => {},
    width: 100,
    height: 100,
    invertY: false,
    styles: {}
  };

  normalizePos = (x: number, y: number): {x: number, y: number} => {
    const {
      width,
      height
    } = this.props;
    return {
      x: Math.min(Math.max(0, x), width),
      y: Math.min(Math.max(0, y), height)
    }
  };

  updatePosition = (e: MouseEvent) => {
    e.preventDefault();

    const {
      onChangePosition,
      height,
      invertY
    } = this.props;
    const rect = this.panelRef.getBoundingClientRect();
    const pos = this.normalizePos(
      e.clientX - rect.left,
      invertY ? height - (e.clientY - rect.top) : e.clientY - rect.top
    );
    onChangePosition(pos.x, pos.y);
  };

  startTracking = () => {
    document.addEventListener('mousemove', this.updatePosition);
    document.addEventListener('touchmove', this.updatePosition);
    document.addEventListener('mouseup', this.stopTracking);
    document.addEventListener('touchend', this.stopTracking);
  };

  stopTracking = () => {
    document.removeEventListener('mousemove', this.updatePosition);
    document.removeEventListener('touchmove', this.updatePosition);
    document.removeEventListener('mouseup', this.stopTracking);
    document.removeEventListener('touchend', this.stopTracking);
  };

  componentDidMount() {
    this.panelRef.getBoundingClientRect();
  }

  render() {
    const {
      onChangePosition,
      width,
      height,
      styles
    } = this.props;

    return (
      <div
        ref={(ref) => this.panelRef = ref}
        onMouseDown={this.startTracking}
        style={Object.assign({}, {width, height}, styles || {})}
      />
    );
  }
}
