import { StyleSheet } from 'react-native';
import colors from '../../utils/colors';

export default StyleSheet.create({
	container: {},
	clockSvg: {
		margin: 14,
	},
	numbersContainer: {
		position: 'absolute',
		left: 0,
		right: 0,
		width: '100%',
		height: '100%',
		margin: 14,
	},
	hourNumberContainer: {
		position: 'absolute',
		width: 18,
		height: 18,
		alignItems: 'center',
	},
	hourNumber: {
		fontSize: 14,
		lineHeight: 18,
		fontWeight: '500',
		color: colors.red1,
	},
	clockArrow: {
		position: 'absolute',
		transform: [{ rotateZ: '0deg' }, { translateY: -73.5 }],
	},
});
