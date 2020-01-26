/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
	AppState,
	Platform,
	StyleSheet,
	View,
	StatusBar,
} from 'react-native';
import AppNavigator from './components/AppNavigator';
import Loader from './components/MaskLoader';
import { EventRegister } from 'react-native-event-listeners';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	root: {
		flex: 1,
	},
	loadingBackgroundStyle: {
		backgroundColor: 'rgba(125, 125, 255, 1)',
	},
});

export default class App extends React.Component {

	state = {
		appState: AppState.currentState,
		appReady: false,
	};

	componentDidMount() {
		// await loadAsync();
		AppState.addEventListener('change', this._handleAppStateChange);
		this.setState({ appReady: true });
	}

	componentWillUnmount() {
		AppState.removeEventListener('change', this._handleAppStateChange);
	}

	_handleAppStateChange = (nextAppState) => {
		if (
			this.state.appState.match(/inactive|background/) &&
			nextAppState === 'active'
		) {
			// EventRegister.emit('appForeground', '');
		}
		this.setState({appState: nextAppState});
	};

	render() {
		return (
			<View style={styles.root}>
				<Loader
					isLoaded={this.state.appReady}
					imageSource={require('./assets/logo.png')}
					backgroundStyle={styles.loadingBackgroundStyle}
				>
					<View style={styles.container}>
						{Platform.OS === 'ios' && <StatusBar barStyle="default" />}
						<AppNavigator />
					</View>
				</Loader>
			</View>
		);
	}
};
