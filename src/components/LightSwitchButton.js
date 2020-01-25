import React from 'react';
import request from 'superagent';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
// import { NetworkInfo } from 'react-native-network-info';

export default class LightSwitchButton extends React.Component {
	state = {
		active: this.props.active || false
	};

	handleLightToggle = (id) => {
		var req = request
		    .get('http://10.10.1.1:30200/api/v1/action/action?id='+id+'&actionType=TOGGLE&delayOn=00:00:00&delayOff=00:00:00')
		    .then(res => {
		        // console.log("done toggle", id);
		    });
		// NetworkInfo.getSSID().then(ssid => {
		//     console.log("SSID", ssid);
		// });

		this.setState({ 
			...this.state,
            active: !this.state.active
        });
	};

	render() {
		return (
			<TouchableOpacity
				{...this.props}
				id={this.props.id || 0}
				style={[
					styles.lightSwitchButton,
					this.state.active ? styles.active : styles.inactive
				]}
				onPress={() => this.handleLightToggle(this.props.id)}
			>
				<Text>{this.props.title || 'Untitled'}</Text>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	lightSwitchButton: {
		width: '50%',
		padding: 20,
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomColor: '#F5F5F5',
		borderRightWidth: 1,
		borderRightColor: '#F5F5F5'
	},
	active: {
		backgroundColor: '#EEE'
	},
	inactive: {
		// backgroundColor: '#FEFEFE'
	}
});
