import React, { FC, memo } from 'react';
import { Circle } from 'react-native-svg';
import colors from '../../utils/colors';

const nodesList12 = new Array(12).fill(null).map((_, idx) => idx);
const itemAngle = (2 * Math.PI) / nodesList12.length;

const HourDot: FC<HourDotProps> = ({ fill = colors.gray, stroke = colors.white1, idx, containerWidth }) => {
	const r = 5;
	const strokeWidth = 2;
	const diameter = r * 2 + strokeWidth;
	const halfDiameter = diameter / 2;
	const freeSpace = containerWidth - diameter;
	const cos = Math.cos(itemAngle * idx);
	const cx = halfDiameter + ((1 + cos) * freeSpace) / 2;
	const sin = Math.sin(itemAngle * idx);
	const cy = halfDiameter + ((1 + sin) * freeSpace) / 2;

	return <Circle cx={cx} cy={cy} r={r} fill={fill} strokeWidth={strokeWidth} stroke={stroke} />;
};

export default memo(HourDot);

interface HourDotProps {
	fill?: string;
	stroke?: string;
	idx: number;
	containerWidth: number;
}
