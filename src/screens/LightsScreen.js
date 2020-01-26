import React from 'react';
import { ActivityIndicator, Image, Platform, ScrollView, StyleSheet, View, Text } from 'react-native';
import ButtonList from '../components/ButtonList';
import LightSwitchButton from '../components/LightSwitchButton';
import LightDimSlider from '../components/LightDimSlider';
import request from 'superagent';
import { EventRegister } from 'react-native-event-listeners';

export default class LightsScreen extends React.Component {

	state = {
		loading: true,
		switches: [],
		dimmers: []
	};

	async componentDidMount() {
		await this.loadItems();
		// EventRegister.addEventListener('appForeground', (data) => {
		// 	await this.loadItems();
        // });
	}

	async loadItems() {
		this.setState({
			...this.state,
			loading: true
		});

		await Promise.all([
			request
				.get('http://10.10.1.1:30200/api/v1/comp/items?types=1')
				.catch(err => { console.log(err); })
				.then(res => {
					// console.log("Load switches OK");
					if( res.body && res.body.length ) {
						this.setState({
							...this.state,
							switches: res.body
						});
					}
					return res;
				}),
			request
				.get('http://10.10.1.1:30200/api/v1/comp/items?types=2')
				.catch(err => { console.log(err); })
				.then(res => {
					// console.log("Load dimmers OK");
					if( res.body && res.body.length ) {
						this.setState({
							...this.state,
							dimmers: res.body
						});
					}
					return res;
				})
		])
		.then(() => { 
			this.setState({
				...this.state,
				loading: false
			});
		})
		.catch(err => { 
			console.log(err);
		});

	}

	render() {
		return (
			<View style={styles.container}>
				<ScrollView
					style={styles.container}
					contentContainerStyle={styles.contentContainer}
				>
					{this.state.loading ? (
						<ActivityIndicator animating={this.state.loading} size="large" color="#666" style={styles.loader} />
					) : (
						<>
							<ButtonList>
								{/* <Text>{ JSON.stringify(this.state.switches) }</Text> */}
								{/* <Text>{ JSON.stringify(this.state.dimmers) }</Text> */}
								<Text style={styles.kindTitle}>Verlichting</Text>
								{this.state.switches.map((item, i) => (
									<React.Fragment key={"lights"+i}>
										{ item.Kind == "0" && 
											<LightSwitchButton id={item.ID} title={item.Description} active={item.Status} />
										}
									</React.Fragment>
								))}

								<Text style={styles.kindTitle}>Dimmers</Text>
								{this.state.dimmers.map((item, i) => (
									<LightDimSlider key={"dimmers"+i} id={item.ID} title={item.Description} value={item.Status} />
								))}
								<Text style={styles.kindTitle}>Sturing</Text>
								{this.state.switches.map((item, i) => (
									<React.Fragment key={"controls"+i}>
										{ item.Kind == "4" && 
											<LightSwitchButton id={item.ID} title={item.Description} active={item.Status} />
										}
									</React.Fragment>
								))}
							</ButtonList>
						</>
					)}

				</ScrollView>
			</View>
		);
	}
}

LightsScreen.navigationOptions = {
	title: "Lights"
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	},
	loader: {
		marginTop: 50,
	},
	contentContainer: {
		justifyContent: "center"
	},
	kindTitle: {
		width: '100%',
		padding: 20,
		fontWeight: "700",
		fontSize: 18,
		textAlign: "center"
	}
});
