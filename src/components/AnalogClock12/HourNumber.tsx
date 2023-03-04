import React, { FC } from 'react';
import { StyleProp, ViewStyle, Text, View } from 'react-native';
import colors from '../../utils/colors';
import styles from './styles';

const nodesList12 = new Array(12).fill(null).map((_, idx) => idx);
const itemAngle = (2 * Math.PI) / nodesList12.length;

const HourNumber: FC<HourNumberProps> = ({ idx, containerWidth, color = colors.black1, style, textStyle }) => {
	const shift = 50;
	const diameter = 18;
	const freeSpace = containerWidth - diameter - shift;
	const cos = Math.cos(itemAngle * idx - 2 * itemAngle);
	const cx = ((1 + cos) * freeSpace) / 2;
	const sin = Math.sin(itemAngle * idx - 2 * itemAngle);
	const cy = ((1 + sin) * freeSpace) / 2;

	return (
		<View style={[styles.hourNumberContainer, { top: cy + shift / 2, left: cx + shift / 2 }, style]}>
			<Text style={[styles.hourNumber, { color }, textStyle]}>{idx + 1}</Text>
		</View>
	);
};

export default HourNumber;

interface HourNumberProps {
	style?: StyleProp<ViewStyle>;
	textStyle?: StyleProp<ViewStyle>;
	idx: number;
	containerWidth: number;
	color?: string;
}
