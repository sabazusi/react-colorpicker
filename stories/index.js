import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import ColorPicker from '../src/index';

storiesOf('ColorPicker', module)
  .add('default: #ff0000', () => (
    <ColorPicker
      default="ff0000"
    />
  ));
