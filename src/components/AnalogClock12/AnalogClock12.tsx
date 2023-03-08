import React, { FC, memo, useEffect, useRef, useState, useMemo } from "react";
import { StyleProp, ViewStyle, View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import colors from "../../utils/colors";
import HourDot from "./HourDot";
import HourNumber from "./HourNumber";
import PeriodArc from "./PeriodArc";
import ClockArrow from "./ClockArrow.svg";
import styles from "./styles";
import {
    Gesture,
    GestureDetector,
    GestureUpdateEvent,
    PanGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
} from "react-native-reanimated";

const hoursesList = new Array(12).fill(null).map((_, idx) => idx);
const hoursesItemAngle = 360 / 12;
const minutesPeriodList = new Array(12 * 4).fill(null).map((_, idx) => idx);
const minutesItemAngle = 360 / (12 * 4);
const arrowHeight = 149;
const arrowWidth = 64;

const AnalogClock12: FC<AnalogClock12Props> = ({
    style,
    width: containerWidth = 272,
    topPadding = 0,
    value = "00:00",
    periods = {},
    clockBorderColor = colors.white1,
    periodSeparator = "–",
    clockFaceNumberStyle,
    hourDotFillColor = colors.gray,
    hourDotBorderColor = colors.white1,
    clockNumberShift,
    onHourSelect,
    onTimeSelectEnd,
}) => {
    const scale = containerWidth / 272;

    const arrowTopPosition = useMemo(
        () => (containerWidth + styles.clockSvg.margin * 2 - arrowHeight) / 2,
        [containerWidth]
    );
    const arrowTLeftPosition = useMemo(
        () => (containerWidth + styles.clockSvg.margin * 2 - arrowWidth) / 2,
        [containerWidth]
    );
    const [initialHours] = value.split(":");
    const container = useRef<View>(null);
    const [currentHour, setCurrentHour] = useState(
        +initialHours > 12 ? +initialHours - 12 : +initialHours
    );
    const arrowAngle = useSharedValue(0);
    const animatedStyles = useAnimatedStyle(() => ({
        transform: [
            { rotateZ: arrowAngle.value + "deg" },
            { translateY: -(arrowHeight / 2) * scale },
            { scale },
        ],
    }));

    const hoursesColorMap = useMemo(() => {
        return Object.keys(periods).reduce<{ [key: number]: string }>(
            (acc, period) => {
                // карта цветов для чисел часов циферблата
                const [startTime, endTime] = period.split(
                    ` ${periodSeparator} `
                );
                const startHour = startTime.split(":")[0];
                const endHour = endTime.split(":")[0];
                const map: { [key: number]: string } = {};

                for (let i = +startHour; i <= +endHour; i++) {
                    map[i] = periods[period]!!;
                }

                return { ...acc, ...map };
            },
            {}
        );
    }, [periods]);

    if (!hoursesColorMap[12] && hoursesColorMap[0]) {
        hoursesColorMap[12] = hoursesColorMap[0];
    }

    useEffect(() => {
        const [hours, minutes] = value.split(":");
        const hours12 = +hours % 12;
        const totalMinutes = hours12 * 60 + +minutes;
        arrowAngle.value = Math.round(totalMinutes / 15) * minutesItemAngle;
    }, [value]);

    const getAngleWrapper = (
        e: GestureUpdateEvent<PanGestureHandlerEventPayload>
    ) => {
        // определение угла поворота стрелки часов
        // вычисляется относительно центра вращения и положения курсора (пальца)
        container.current?.measure((...args) => {
            const angle = getAngleFromHandler(args, e, topPadding);
            arrowAngle.value = angle;

            const [hours, minutes] = getHoursesAndMinutesFromAngle(angle);
            onHourSelect?.(hours, minutes);

            const hoursForNumberColor = getHoursesFromAngle(angle);
            hoursForNumberColor !== currentHour &&
                setCurrentHour(hoursForNumberColor);
        });
    };

    const onSetClockEnd = (
        e: GestureUpdateEvent<PanGestureHandlerEventPayload>
    ) => {
        container.current?.measure((...args) => {
            const angle = getAngleFromHandler(args, e, topPadding);
            const [hours, minutes, magnetAngle] =
                getHoursesAndMinutesFromAngle(angle);
            arrowAngle.value = magnetAngle;
            onTimeSelectEnd?.(hours, minutes);
        });
    };

    const gesture = Gesture.Pan()
        .onBegin((e) => {
            runOnJS(getAngleWrapper)(e);
        })
        .onUpdate((e) => {
            runOnJS(getAngleWrapper)(e);
        })
        // .onEnd(() => {})
        .onFinalize((e) => {
            runOnJS(onSetClockEnd)(e);
        });

    return (
        <GestureDetector gesture={gesture}>
            <View style={[styles.container, style]} ref={container}>
                <Svg
                    height={containerWidth}
                    width={containerWidth}
                    viewBox={`0 0 ${containerWidth} ${containerWidth}`}
                    style={styles.clockSvg}
                >
                    <Circle
                        cx="50%"
                        cy="50%"
                        r={(containerWidth - styles.clockSvg.margin) / 2 + 1}
                        stroke={clockBorderColor}
                        strokeWidth="12"
                        fill="transparent"
                    />
                    <Circle cx="50%" cy="50%" r="5" fill={colors.black1} />

                    {hoursesList.map((idx) => {
                        return (
                            <HourDot
                                idx={idx}
                                key={idx}
                                fill={hourDotFillColor}
                                stroke={hourDotBorderColor}
                                containerWidth={containerWidth}
                            />
                        );
                    })}

                    {Object.keys(periods).map((period) => {
                        const [startTime, endTime] = period.split(
                            ` ${periodSeparator} `
                        );
                        const startHour = startTime.split(":")[0];
                        const endHour = endTime.split(":")[0];

                        return (
                            <PeriodArc
                                key={period}
                                startHour={+startHour}
                                endHour={+endHour}
                                color={periods[period]}
                                containerWidth={containerWidth}
                            />
                        );
                    })}

                    {hoursesList.map((idx) => {
                        return (
                            <HourDot
                                idx={idx}
                                key={idx}
                                fill="transparent"
                                stroke={hourDotBorderColor}
                                containerWidth={containerWidth}
                            />
                        );
                    })}
                </Svg>

                <Animated.View
                    style={[
                        styles.clockArrow,
                        {
                            left: arrowTLeftPosition,
                            top: arrowTopPosition,
                        },
                        animatedStyles,
                    ]}
                >
                    <ClockArrow />
                </Animated.View>

                <View style={styles.numbersContainer} pointerEvents="none">
                    {hoursesList.map((idx) => {
                        let color = colors.black1;

                        if (
                            currentHour === idx + 1 ||
                            (currentHour === 0 && idx === 11)
                        ) {
                            color = hoursesColorMap[idx + 1] || colors.white;
                        }

                        return (
                            <HourNumber
                                idx={idx}
                                key={idx}
                                containerWidth={containerWidth}
                                color={color}
                                textStyle={clockFaceNumberStyle}
                                shift={clockNumberShift}
                            />
                        );
                    })}
                </View>
            </View>
        </GestureDetector>
    );
};

export default memo(AnalogClock12);

interface AnalogClock12Props {
    style?: StyleProp<ViewStyle>;
    clockFaceNumberStyle?: StyleProp<ViewStyle>;
    width?: number;
    topPadding?: number;
    value?: string;
    periodSeparator?: string;
    clockBorderColor?: string;
    hourDotFillColor?: string;
    hourDotBorderColor?: string;
    clockNumberShift?: number;
    periods?: { [key: string]: string };
    onHourSelect?(hour: number, minutes: number): void;
    onTimeSelectEnd?(hour: number, minutes: number): void;
}

const getAngle = (x: number, y: number): number => {
    const alpha = x / Math.sqrt(x ** 2 + y ** 2);
    const alphaGrad = Math.asin(alpha) * (180 / Math.PI);
    let angle = 0;

    if (y > 0) {
        angle = 180 - alphaGrad;
    } else if (x > 0) {
        angle = alphaGrad;
    } else if (x < 0) {
        angle = 360 + alphaGrad;
    }

    return angle;
};

const getAngleFromHandler = (
    measureArgs: number[],
    e: GestureUpdateEvent<PanGestureHandlerEventPayload>,
    topPadding: number
): number => {
    const [x, y, width, height, pageX, pageY] = measureArgs;
    const { absoluteX, absoluteY } = e;
    const center = {
        x: pageX + width / 2,
        y: pageY + height / 2,
    };
    const cursor = {
        x: absoluteX,
        y: absoluteY + topPadding,
    };
    let coordX = cursor.x - center.x;
    let coordY = cursor.y - center.y;

    return getAngle(coordX, coordY);
};

const getHoursesAndMinutesFromAngle = (currentAngle: number): number[] => {
    let angleIndex = 0;

    for (let idx of minutesPeriodList) {
        const angle = idx * minutesItemAngle;
        const angleDiff = Math.abs(currentAngle - angle);

        if (angleDiff < minutesItemAngle / 2) {
            angleIndex = idx;
            break;
        }
    }

    const magnetAngle = angleIndex * minutesItemAngle;
    const totalMinutes = angleIndex * 15;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return [hours, minutes, magnetAngle];
};

const getHoursesFromAngle = (currentAngle: number): number => {
    let angleIndex = 0;

    for (let idx of hoursesList) {
        const angle = idx * hoursesItemAngle;
        const angleDiff = Math.abs(currentAngle - angle);

        if (angleDiff < hoursesItemAngle / 2) {
            angleIndex = idx;
            break;
        }
    }

    return angleIndex;
};
