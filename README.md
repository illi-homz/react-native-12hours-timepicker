# react-native-12hours-timepicker

### Time picker for US time standart
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
  dayPeriods={{'11:00 – 14:00': 'red'}} // max hour 24:00
  value={'13:00'} // 24 hours format
  onChange={(v) => onTimeChange(v)}
  clockWidth={272}
  periodSeparator="–"
  title="Select time"
/>
```

```javascript
<AnalogClock12
    topPadding={0}
    // onHourSelect run when Gesture.Pan.**onBegin**() and Gesture.Pan.**onUpdate**()
    // hour in range from 0 to 11
    onHourSelect={(hour: number, minutes: number) => onTimeChanged(hour, minutes)}
    value={'13:00'} // 24 hours format
    periods={{'07:00 – 09:00': 'red'}} // max hour 12:00
    // onTimeSelectEnd run when Gesture.Pan.**onFinalize**()
    // hour in range from 0 to 11
    onTimeSelectEnd={(hour: number, minutes: number) => onTimeSelectEnd(hour, minutes)}
    width={272}
    periodSeparator="–"
/>
```

## Options

### TimePicker

| Props | Type | Data | Default |
| --- | --- | --- | --- |
| title | String | Time picker title | 'Select time' |
| topPadding | Number | Status bar height for pan responder if work custom safe-area-view, such as react-native-safe-area-context | 0 |
| clockWidth | Number | Default width for analog clock | 272 |
| value | String | Value in 24 hours format | '00:00' |
| dayPeriods | { period: color } | Period in 24 hours format and color for this period, **{ '11:00 – 14:00': '#FFA98D' }** | {} |
| onChange | (string): void | Return value in 24 hours format, '14:00' | - |
| clockBorderColor | String | Clock border color | '#F7F7F7' |
| periodSeparator | String | Periods keys separator | '–' |
| style | StyleProp | Styles for main container | - |
| timeContainerStyle | StyleProp | Styles for numeric timer container | - |
| titleStyle | StyleProp | Styles for title | - |
| timeStyle | StyleProp | Styles for numeric timer text | - |
| switcherStyle | StyleProp | Styles for meridiem switcher container | - |
| clockFaceNumberStyle | StyleProp | Styles for number literal on clock face | - |
| switcherTextStyle | StyleProp | Styles for meridiem switcher text | - |
<br>

### AnalogClock12

| Props | Type | Data | Default |
| --- | --- | --- | --- |
| style | StyleProp | Styles for clock container | - |
| clockFaceNumberStyle | StyleProp | Styles for number literal on clock face | - |
| width | Number | Clock width | 272 |
| topPadding | Number | Status bar height for pan responder if work custom safe-area-view, such as react-native-safe-area-context | 0 |
| value | String | Value in 24 hours format | '00:00' |
| periodSeparator | String | Periods keys separator | '–' |
| clockBorderColor | String | Clock border color | '#F7F7F7' |
| periods | Period in 24 hours format and color for this period, but max time 12:00, **{ '09:00 – 12:00': '#FFA98D' }** | {} |
| onHourSelect | (hour: number, minutes: number) => void | Run when Gesture.Pan handled **onBegin** and **onUpdate**. Hour in range from 0 to 11 | - |
| onTimeSelectEnd | (hour: number, minutes: number) => void | run when Gesture.Pan handled **onFinalize**. Hour in range from 0 to 11 | - |

<br>

## Authors

- [Ilya Gomza](https://github.com/illi-homz/)
