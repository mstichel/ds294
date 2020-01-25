import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';

export default class SettingsScreen extends React.Component {
	render() {
		return (
			<View>
				<ScrollView>
					<Text>Settings</Text>
				</ScrollView>
			</View>
		);
	}
}

SettingsScreen.navigationOptions = {
	title: 'Settings'
};
