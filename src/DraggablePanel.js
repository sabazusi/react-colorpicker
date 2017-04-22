// @flow

import React from 'react';

type Props = {
  onChangePosition: (x: number, y: number) => void;
  max?: {
    x: number;
    y: number;
  };
  min?: {
    x: number;
    y: number;
  };
  invertY?: boolean;
  styles?: {
    width: number;
    height: number;
  };
  children?: HTMLElement;
};

type DefaultProps = Props;

export default class DraggablePanel extends React.Component<DefaultProps, Props, void> {
  panelRef: HTMLElement;

  static defaultProps = {
    onChangePosition: () => {},
    max: {
      x: 100,
      y: 100
    },
    min: {
      x: 0,
      y: 0
    },
    invertY: false,
    styles: {
      width: 100,
      height: 100
    }
  };

  normalizePos = (x: number, y: number): {x: number, y: number} => {
    const {
      max,
      min
    } = this.props;
    const {
      width,
      height
    } = this.props.styles;
    const convertX = (value) => parseInt((max.x - min.x) * (value / width), 10) + min.x;
    const convertY = (value) => parseInt((max.y - min.y) * (value / height), 10) + min.y;
    return {
      x: convertX(Math.min(Math.max(0, x), width)),
      y: convertY(Math.min(Math.max(0, y), height))
    }
  };

  updatePosition = (e: MouseEvent) => {
    e.preventDefault();

    const {
      onChangePosition,
      styles,
      invertY
    } = this.props;
    const rect = this.panelRef.getBoundingClientRect();
    const pos = this.normalizePos(
      e.clientX - rect.left,
      invertY ? styles.height - (e.clientY - rect.top) : e.clientY - rect.top
    );
    onChangePosition(pos.x, pos.y);
  };

  startTracking = (e: MouseEvent) => {
    document.addEventListener('mousemove', this.updatePosition);
    document.addEventListener('touchmove', this.updatePosition);
    document.addEventListener('mouseup', this.stopTracking);
    document.addEventListener('touchend', this.stopTracking);
    this.updatePosition(e);
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
      styles,
      children
    } = this.props;

    return (
      <div
        ref={(ref) => this.panelRef = ref}
        onMouseDown={this.startTracking}
        style={styles}
      >
        {children ? children : null}
      </div>
    );
  }
}
