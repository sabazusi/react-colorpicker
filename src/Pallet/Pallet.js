// @flow

import React from 'react';
import Color from 'color';
import cx from 'classnames';
import DraggablePanel from '../DraggablePanel';
import styles from './style.css';

type Props = {
  onChange: (x: number, y: number) => void;
  width: number;
  height: number;
  hsv: {
    h: number;
    s: number;
    v: number;
  };
  pointerClassName?: string;
};

export default class Pallet extends React.Component<void, Props, void> {
  render() {
    const {
      onChange,
      width,
      height,
      hsv,
      pointerClassName
    } = this.props;
    const left = Math.min(width * hsv.s / 100, width - 1);
    const bottom = Math.min(height * hsv.v / 100, height - 1);
    return (
      <div
        className={styles.container}
        style={{width, height}}
      >
        <span
          className={cx(styles.pointer, pointerClassName)}
          style={{ left, bottom }}
        />
        <DraggablePanel
          onChangePosition={onChange}
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
            width,
            height,
            backgroundColor: `${Color({h:hsv.h, s:100, v: 100}).rgb().string()}`
          }}
        >
          <div
            className={styles.whiteBase}
            style={{width, height}}
          >
            <div
              className={styles.blackBase}
              style={{width, height}}
            />
          </div>
        </DraggablePanel>
      </div>
    );
  }
}
