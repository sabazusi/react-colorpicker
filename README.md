React-Simple-ColorPicker
====
Simple colorpicker for react.

<img src="./screenshot.png" width="300" height="400">


## Install
`$ npm i git+ssh://git@github.com/sabazusi/react-colorpicker.git --save`

or

`$ yarn add git+ssh://git@github.com/sabazusi/react-colorpicker.git`

## Usage
```javascript
import ColorPicker from 'react-colorpicker';

const onChangeColor = (currentColor) => {
  console.log(currentColor); // {hsv: {}, rgb: {}}
};

const palletOptions = {
  width: 300,
  height: 300,
  pointerClassName: 'my-pallet-pointer-class-name'
};

const hueBarOptions = {
  width: 300,
  height: 300,
  pointerClassName: 'my-huebar-pointer-class-name'
};

const component = () => {
  return (
    <ColorPicker
      defaultColor="red"
      onChange={onChangeColor}
      pallet={palletOptions}
      hueBar={hueBarOptions}
    />
  )
}
```

## Props
| prop name | type | default |
|:----------|------|--------:|
|defaultColor|string / Object / array (Using [color.js](https://github.com/qix-/color), detect color by it)|red|
|onChange|(color: {hsv: Object, rgb: Object})=> void|(color) => console.log(color)|
|pallet|{width: number, height: number, pointerClassName: string}|{width: 200, height: 200}|
|hueBar|{width: number, height: number, pointerClassName: string|{width: 200, height: 200}|
