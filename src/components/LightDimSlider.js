import React from 'react';
import request from 'superagent';
import _ from 'lodash';

import { StyleSheet, Text, View } from 'react-native';
import Slider from '@react-native-community/slider';

export default class LightDimSlider extends React.Component {
	state = {
		value: 0
	};

	componentDidMount() {
		this.setState({
			...this.state,
			value: this.props.value / 100
		});
	}

	_handleValueChange = (value) => {
        var dimStatus = ~~(value * 100);

		var req = request
			.get(
				'http://10.10.1.1:30200/api/v1/action/action?id=' +
					this.props.id +
					'&actionType=DIM&delayOn=00:00:00&delayOff=00:00:00&value=' +
					dimStatus
			)
			.then((res) => {
				// console.log('done DIM to ' + dimStatus, id);
			});

		this.setState({
			...this.state,
			value: value
		});
	};

	render() {
		return (
			<View style={styles.container}>
				<Text>{this.props.title}</Text>
				<Slider {...this.props} value={this.state.value} onValueChange={_.debounce(this._handleValueChange, 300)} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		padding: 20,
		alignItems: 'stretch',
		justifyContent: 'center',
		borderBottomWidth: 1,
		borderBottomColor: '#F5F5F5'
	}
});
