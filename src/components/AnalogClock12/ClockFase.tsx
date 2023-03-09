import React, { FC, memo } from "react";
import Svg, { Circle } from "react-native-svg";
import colors from "../../utils/colors";
import HourDot from "./HourDot";
import PeriodArc from "./PeriodArc";
import styles from "./styles";

const hoursesList = new Array(12).fill(null).map((_, idx) => idx);

const ClockFase: FC<ClockFaseProps> = ({
    containerWidth,
    clockBorderColor,
    hourDotFillColor,
    hourDotBorderColor,
    periods,
    periodSeparator,
}) => {
    return (
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
    );
};

export default memo(ClockFase);

interface ClockFaseProps {
    containerWidth: number;
    clockBorderColor: string;
    hourDotFillColor: string;
    hourDotBorderColor: string;
    periods: number;
    periodSeparator: string;
}
