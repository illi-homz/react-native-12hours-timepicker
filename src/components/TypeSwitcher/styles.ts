import { StyleSheet } from 'react-native';
import colors from '../../utils/colors';
import { fonts } from '../../utils/fonts';

export default StyleSheet.create({
	container: {
		flexDirection: 'row',
		backgroundColor: colors.white1,
		borderRadius: 100,
	},
	item: {
		paddingHorizontal: 16,
	},
	text: {
		fontSize: 14,
		lineHeight: 28,
		color: colors.black1,
		fontFamily: fonts.beVietnam500,
	},
	activeItem: {
		backgroundColor: colors.black1,
		borderRadius: 100,
	},
	activeText: {
		color: colors.white,
	},
});
