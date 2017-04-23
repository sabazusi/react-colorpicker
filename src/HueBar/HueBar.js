// @flow

import React from 'react';
import cx from 'classnames';
import DraggablePanel from '../DraggablePanel';
import styles from './style.css';

type Props = {
  onChange: (x: number, y: number) => void;
  width: number;
  height: number;
  position: {
    left: number;
  }
  pointerClassName?: string;
};

export default class HueBar extends React.Component<void, Props, void> {
  render() {
    const {
      onChange,
      width,
      height,
      position,
      pointerClassName
    } = this.props;
    return (
      <div
        className={styles.container}
        style={{
          width,
          height
        }}
      >
        <span
          className={cx(styles.pointer, pointerClassName)}
          style={{ left: Math.min(position.left, width - 1) }}
        />
        <DraggablePanel
          onChangePosition={onChange}
          invertY
          max={{
            x: 360,
            y: 0
          }}
          min={{
            x: 0,
            y: 0
          }}
          styles={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to right, #ff0000 0%, #ff9900 10%, #cdff00 20%, #35ff00 30%, #00ff66 40%, #00fffd 50%, #0066ff 60%, #3200ff 70%, #cd00ff 80%, #ff0099 90%, #ff0000 100%)'
          }}
        />
      </div>
    );
  }
}
