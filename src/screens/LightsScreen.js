import React from 'react';
import { ActivityIndicator, Image, Platform, ScrollView, StyleSheet, View, Text } from 'react-native';
import ButtonList from '../components/ButtonList';
import LightSwitchButton from '../components/LightSwitchButton';
import LightDimSlider from '../components/LightDimSlider';
import request from 'superagent';


export default class LightsScreen extends React.Component {

	state = {
		loading: true,
		switches: [],
		dimmers: []
	};

	componentDidMount() {
		this.loadItems();
	}

	loadItems() {
		this.setState({
			...this.state,
			loading: true
		});

		var switches = request
		    .get('http://10.10.1.1:30200/api/v1/comp/items?types=1')
		    .then(res => {
				this.setState({
					...this.state,
					switches: res.body
				});
			});
			
		var dimmers = request
		    .get('http://10.10.1.1:30200/api/v1/comp/items?types=2')
		    .then(res => {
				this.setState({
					...this.state,
					dimmers: res.body
				});
			});
			
		this.setState({
			...this.state,
			loading: false
		});
	}

	render() {
		return (
			<View style={styles.container}>
				<ScrollView
					style={styles.container}
					contentContainerStyle={styles.contentContainer}
				>
					<View style={styles.welcomeContainer}>
						{/* <Image
							source={
								__DEV__ ? (
									require('../assets/images/robot-dev.png')
								) : (
									require('../assets/images/robot-prod.png')
								)
							}
							style={styles.welcomeImage}
						/> */}
					</View>
					{this.state.loading ? (
						<ActivityIndicator animating={this.state.loading} size="large" color="#0000ff" />
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
	contentContainer: {
		
	},
	welcomeContainer: {
		alignItems: 'center',
		marginTop: 10,
		// marginBottom: 20
	},
	welcomeImage: {
		width: 100,
		height: 80,
		resizeMode: 'contain',
		marginTop: 3,
		marginLeft: -10
	},
	kindTitle: {
		width: '100%',
		padding: 20,
		fontWeight: "700",
		fontSize: 18,
		textAlign: "center"
	}
});
