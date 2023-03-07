# react-native-12hours-timepicker

### Time picker for US time format
<br>

<img src="https://github.com/illi-homz/react-native-12hours-timepicker/blob/main/demo/assets/react-native-12hours-timepicker.gif?raw=true" width="250">
<br>

## Installation
Using NPM:
```
$ npm i react-native-12hours-timepicker
```

Using Yarn:
```
$ yarn add react-native-12hours-timepicker
```

## Usage
```javascript
import { TimePicker, AnalogClock12 } from 'react-native-12hours-timepicker'
```


```javascript
<TimePicker
  topPadding={0}
  dayPeriods={{'11:00 – 14:00': 'red'}}
  value={'13:00'}
  onChange={(v) => onTimeChange(v)}
  clockWidth={272}
  periodSeparator="–"
  title="Select time"
/>
```

## Options

| Props | Type | Data | Default |
| --- | --- | --- | --- |
| style | StyleProp | Styles for main container | - |
| timeContainerStyle | StyleProp | Styles for numeric timer container | - |
| titleStyle | StyleProp | Styles for title | - |
| timeStyle | StyleProp | Styles for numeric timer text | - |
| switcherStyle | StyleProp | Styles for meridiem switcher container | - |
| clockFaceNumberStyle | StyleProp | Styles for number literal on clock face | - |
| switcherTextStyle | StyleProp | Styles for meridiem switcher text | - |
| topPadding | Number | Status bar height for pan responder if work custom safe-area-view, such as react-native-safe-area-context | 0 |
| clockWidth | Number | Default width for analog clock | 272 |
| value | String | Value in 24 hours format | '00:00' |
| dayPeriods | { period: color } | Period in 24 hours format and color for this period, **{ '11:00 – 14:00': '#FFA98D' }** | {} |
| onChange | (string): void | Return value in 24 hours format, '14:00' | - |
| title | String | Time picker title | 'Select time' |
| periodSeparator | String | Periods keys separator | '–' |
<br>

## Authors

- [Ilya Gomza](https://github.com/illi-homz/)
