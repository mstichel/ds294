import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';

export default class MoodsScreen extends React.Component {
	render() {
		return (
			<View>
				<ScrollView>
					<Text>Moods</Text>
				</ScrollView>
			</View>
		);
	}
}

MoodsScreen.navigationOptions = {
	title: 'Moods'
};
