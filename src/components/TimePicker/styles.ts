import { StyleSheet } from 'react-native';
import colors from '../../utils/colors';

export default StyleSheet.create({
	container: {},
	digitPickerContainer: {
		alignItems: 'center',
	},
	title: {
		fontSize: 16,
		lineHeight: 20,
		color: colors.black1,
		fontWeight: '600',
		marginBottom: 32,
	},
	time: {
		fontSize: 54,
		lineHeight: 68,
		color: colors.black1,
		fontWeight: '700',
		marginBottom: 12,
	},
	switcher: {
		marginBottom: 64,
	},
});
