import React, {
    FC,
    memo,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";
import { TextStyle } from "react-native";
import { StyleProp, ViewStyle, Text, View } from "react-native";
import { MeridiemType, TypeSwitcherItem } from "../../types/calendar";
import { convertTimeToUSFormat } from "../../utils/calendar";
import AnalogClock12 from "../AnalogClock12";
import TypeSwitcher from "../TypeSwitcher";
import styles from "./styles";

const middleTime = "12:00";

const TimePicker: FC<TimePickerProps> = ({
    topPadding = 0,
    value = "00:00",
    dayPeriods = {},
    style,
    clockWidth,
    onChange,
    title = "Select time",
    timeContainerStyle,
    titleStyle,
    timeStyle,
    switcherStyle,
    switcherTextStyle,
    periodSeparator = "–",
    clockFaceNumberStyle,
}) => {
    const [currentTime, setCurrentTime] = useState(value); // хранилище времени в 12 часовом формате
    const [meridiem, setMeridiem] = useState<MeridiemType>("AM"); // хранилище полудня

    useEffect(() => {
        // изменение времени при изменении входного параметра
        // который поменяется при окончании выбора времени
        const dateStartUS = convertTimeToUSFormat(value);
        const [t, m] = dateStartUS.split(" ");
        currentTime !== t && setCurrentTime(t);
        meridiem !== m && setMeridiem(m as MeridiemType);
    }, [value]);

    useEffect(() => {
        // изменение времени при переключении полудня
        const [hours, minutes] = currentTime.split(":");
        onTimeSelectEnd(+hours, +minutes);
    }, [meridiem]);

    const [amPeriods, pmPeriods] = useMemo(() => {
        // разделение периодов на дополуденных и после
        return splitPeriodsOnAmAndPm(dayPeriods, periodSeparator);
    }, [dayPeriods]);

    const currentPeriods = useMemo(() => {
        // выбор периода в зависимости от полудня
        return meridiem === "AM" ? amPeriods : pmPeriods;
    }, [amPeriods, pmPeriods, meridiem]);

    const onTimeChanged = useCallback(
        // cb при перемещении стрелки часов
        (hours: number, minutes: number) => {
            let currentHours = +hours;
            if (meridiem === "PM") currentHours += 12;
            const twoDigitHours = (currentHours < 10 ? "0" : "") + currentHours;
            const twoDigitMinutes = (minutes < 10 ? "0" : "") + minutes;
            const time24 = `${twoDigitHours}:${twoDigitMinutes}`;
            const [time] = convertTimeToUSFormat(time24).split(" ");
            setCurrentTime(time);
        },
        [meridiem]
    );

    const onTimeSelectEnd = useCallback(
        // cb при окончании перемещения стрелки часов
        (hours: number, minutes: number) => {
            const hours24 =
                meridiem === "PM" && hours < 12 ? (hours += 12) : hours;
            const twoDigitHours24 = (hours24 < 10 ? "0" : "") + hours24;
            const twoDigitMinutes = (minutes < 10 ? "0" : "") + minutes;
            onChange?.(`${twoDigitHours24}:${twoDigitMinutes}`);
        },
        [meridiem, onChange]
    );

    return (
        <View style={[styles.container, style]}>
            <View style={[styles.digitPickerContainer, timeContainerStyle]}>
                {!!title && (
                    <Text style={[styles.title, titleStyle]}>{title}</Text>
                )}
                <Text style={[styles.time, timeStyle]}>{currentTime}</Text>
                <TypeSwitcher
                    data={switcherValues}
                    onTypeChange={setMeridiem}
                    value={meridiem}
                    style={[styles.switcher, switcherStyle]}
                    textStyle={switcherTextStyle}
                />
            </View>
            <AnalogClock12
                topPadding={topPadding}
                onHourSelect={onTimeChanged}
                value={value}
                periods={currentPeriods}
                onTimeSelectEnd={onTimeSelectEnd}
                width={clockWidth}
                periodSeparator={periodSeparator}
                clockFaceNumberStyle={clockFaceNumberStyle}
            />
        </View>
    );
};

export default memo(TimePicker);

interface TimePickerProps {
    style?: StyleProp<ViewStyle>;
    timeContainerStyle?: StyleProp<ViewStyle>;
    titleStyle?: StyleProp<ViewStyle>;
    timeStyle?: StyleProp<ViewStyle>;
    switcherStyle?: StyleProp<ViewStyle>;
    clockFaceNumberStyle?: StyleProp<TextStyle>;
    switcherTextStyle?: StyleProp<TextStyle>;
    topPadding?: number;
    clockWidth?: number;
    value?: string;
    dayPeriods?: { [key: string]: string };
    onChange?(v: string): void;
    title?: string;
    periodSeparator?: string;
}

const switcherValues: TypeSwitcherItem<"AM" | "PM">[] = [
    { id: 0, title: "AM", value: "AM" },
    { id: 1, title: "PM", value: "PM" },
];

const splitPeriodsOnAmAndPm = (
    dayPeriods: { [key: string]: string },
    periodSeparator = "–"
) => {
    return Object.keys(dayPeriods).reduce(
        (acc, period) => {
            const [amPeriodsAcc, pmPeriodsAcc] = acc;
            const [startTime, endTime] = period.split(
                ` ${periodSeparator} `
            );

            if (startTime < middleTime && endTime < middleTime) {
                return [
                    { ...amPeriodsAcc, [period]: dayPeriods[period] },
                    pmPeriodsAcc,
                ];
            }

            if (startTime > middleTime && endTime > middleTime) {
                // если часы выше 12:00 то понижается на 12 часов значение их часов
                // и назначается 2х значиный формат часа
                const startHour = +startTime.split(":")[0] - 12;
                const curStartHour = (startHour < 10 ? "0" : "") + startHour;
                const endHour = +endTime.split(":")[0] - 12;
                const curEndHour = (endHour < 10 ? "0" : "") + endHour;
                const curPeriod = `${curStartHour}:00 ${periodSeparator} ${curEndHour}:00`;

                return [
                    amPeriodsAcc,
                    { ...pmPeriodsAcc, [curPeriod]: dayPeriods[period] },
                ];
            }

            if (startTime < middleTime && endTime > middleTime) {
                const endHour = +endTime.split(":")[0] - 12;
                const curEndHour = (endHour < 10 ? "0" : "") + endHour;

                return [
                    {
                        ...amPeriodsAcc,
                        [`${startTime} ${periodSeparator} 12:00`]:
                            dayPeriods[period],
                    },
                    {
                        ...pmPeriodsAcc,
                        [`00:00 ${periodSeparator} ${curEndHour}:00`]:
                            dayPeriods[period],
                    },
                ];
            }

            return acc;
        },
        [{}, {}]
    );
};
