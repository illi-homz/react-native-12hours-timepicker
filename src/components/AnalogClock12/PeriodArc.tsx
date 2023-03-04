import React, { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Path } from 'react-native-svg';
import colors from '../../utils/colors';

const nodesList12 = new Array(12).fill(null).map((_, idx) => idx);
const itemAngle = (2 * Math.PI) / nodesList12.length;

const PeriodArc: FC<PeriodArcProps> = ({ startHour, endHour, color = '#bD2828', containerWidth = 272 }) => {
	if (startHour > endHour) return null;

	const options: PathOptionsType = {
		size: containerWidth,
		stroke: 12,
		angle: 320,
		fillCircle: true,
		center: 0,
		radius: 0,
	};
	options.center = options.size / 2;
	options.radius = options.center - options.stroke / 2;

	const firstAngle = endHour > 6 ? 90 : toDegrees(endHour * itemAngle) + 270;
	const secondAngle = -270 + toDegrees(endHour * itemAngle) - 180;

	const startAngle = toDegrees(startHour * itemAngle);
	const start = getStart(startAngle + 270, options);

	const firstArc = startHour <= 6 ? getArc(firstAngle, options) : '';
	const secondArc = endHour > 6 ? getArc(secondAngle, options) : '';

	const d = start + ' ' + firstArc + ' ' + secondArc;

	return <Path stroke={color} strokeWidth={options.stroke} fill={colors.transparent} d={d} strokeLinecap="round" />;
};

export default PeriodArc;

interface PeriodArcProps {
	style?: StyleProp<ViewStyle>;
	startHour: number;
	endHour: number;
	containerWidth?: number;
	color?: string;
}

type PathOptionsType = {
	size: number;
	stroke: number;
	angle: number;
	fillCircle: boolean;
	center: number;
	radius: number;
};

const toDegrees = (angle: number) => {
	return angle * (180 / Math.PI);
};

const radians = (degrees: number) => {
	return (degrees / 180) * Math.PI;
};

const getArc = (angle: number, options: PathOptionsType) => {
	const x = options.center + options.radius * Math.cos(radians(angle));
	const y = options.center + options.radius * Math.sin(radians(angle));

	return 'A' + options.radius + ',' + options.radius + ' 1 0 1 ' + x + ',' + y;
};

const getStart = (angle: number, options: PathOptionsType) => {
	const x = options.center + options.radius * Math.cos(radians(angle));
	const y = options.center + options.radius * Math.sin(radians(angle));

	return `M${x},${y}`;
};
