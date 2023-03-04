import React, { FC } from 'react';
import { StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { MeridiemType, TypeSwitcherItem } from '../../types/calendar';
import styles from './styles';

const TypeSwitcher: FC<TypeSwitcherProps> = ({ data, value, onTypeChange, style }) => {
	return (
		<View style={[styles.container, style]}>
			{data.map(({ value: itemValue, title, id }) => {
				return (
					<TouchableOpacity
						style={[styles.item, itemValue === value && styles.activeItem]}
						key={id}
						activeOpacity={0.7}
						onPress={() => onTypeChange(itemValue)}>
						<Text style={[styles.text, itemValue === value && styles.activeText]}>{title}</Text>
					</TouchableOpacity>
				);
			})}
		</View>
	);
};

export default TypeSwitcher;

interface TypeSwitcherProps {
	value: string;
	data: TypeSwitcherItem<MeridiemType>[];
	onTypeChange: (str: MeridiemType) => void;
	style?: StyleProp<ViewStyle>;
}
