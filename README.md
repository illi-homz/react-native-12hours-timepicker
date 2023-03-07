# react-native-12hours-timepicker

### Time picker for US time format

<img src="https://github.com/illi-homz/react-native-12hours-timepicker/blob/main/demo/assets/react-native-12hours-timepicker.gif?raw=true" width="250">
<br>
<br>
```bash
npm i react-native-12hours-timepicker
or
yarn add react-native-12hours-timepicker
```
<br>
```ts
import { TimePicker, AnalogClock12 } from 'react-native-12hours-timepicker'
```
<br>
```tsx
<TimePicker
  topPadding={topPadding}
  dayPeriods={dayPeriods}
  value={timePickerData.value}
  onChange={timePickerData.cb}
  titleStyles={styles.timepickerTitle}
  timeStyles={styles.timepickerTime}
  switcherTextStyle={styles.meridiemSwitcherTextStyle}
  clockFaceNumberStyle={styles.clockFaceNumber}
/>
```
<br>

| Props | Type | Data | Default |
| --- | --- | --- | --- |
| style | StyleProp | Styles for msin container | - |
| timeContainerStyles | StyleProp | Styles for numeric timer container | - |
| titleStyles | StyleProp | Styles for title | - |
| timeStyles | StyleProp | Styles for numeric timer text | - |
| switcherStyles | StyleProp | Styles for meridiem switcher container | - |
| clockFaceNumberStyle | StyleProp | Style for number literal on clock face | - |
| switcherTextStyle | StyleProp | Styles for meridiem switcher text | - |
| topPadding | Number | Status bar height for pan responder if work costom safe-area-view, such as react-native-safe-area-context | 0 |
| clockWidth | Number | Default width for analog clock | 272 |
| value | String | Value in 24 hours format | '00:00' |
| dayPeriods | { period: color } | Period in 24 hours format and color for this period, **{ '11:00 – 14:00': '#FFA98D' }** | {} |
| onChange | (string): void | Return value in 24 hours format | undefined |
| title | String | Time picker title | 'Select time' |
| periodSplitliteral | String | Periods separator | '–' |

