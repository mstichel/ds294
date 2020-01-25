import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import LightsScreen from '../screens/LightsScreen';
import LinksScreen from '../screens/MoodsScreen';
import SettingsScreen from '../screens/SettingsScreen';

const config = Platform.select({
	web: { headerMode: 'screen' },
	default: {},
});

const LightsStack = createStackNavigator(
	{
		Lights: LightsScreen,
	},
	config
);

LightsStack.navigationOptions = {
	tabBarLabel: 'Lights',
	tabBarIcon: ({ focused }) => (
		<TabBarIcon
			focused={focused}
			name={
				Platform.OS === 'ios'
					? `ios-information-circle${focused ? '' : '-outline'}`
					: 'md-information-circle'
			}
		/>
	),
};

LightsStack.path = '';

const MoodsStack = createStackNavigator(
	{
		Links: LinksScreen,
	},
	config
);

MoodsStack.navigationOptions = {
	tabBarLabel: 'Moods',
	tabBarIcon: ({ focused }) => (
		<TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
	),
};

MoodsStack.path = '';

const SettingsStack = createStackNavigator(
	{
		Settings: SettingsScreen,
	},
	config
);

SettingsStack.navigationOptions = {
	tabBarLabel: 'Settings',
	tabBarIcon: ({ focused }) => (
		<TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
	),
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
	LightsStack,
	MoodsStack,
	SettingsStack,
});

tabNavigator.path = '';

export default tabNavigator;
