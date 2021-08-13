import DeckCollection from "../components/DeckCollection";
import DeckOverview from "../components/DeckOverview";
import Quiz from "../components/Quiz";
import CreateDecks from "../components/CreateDeck";
import AddCard from "../components/AddCard";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";

const MainTab = createBottomTabNavigator();
export function MainNav() {
	return (
		<NavigationContainer>
			<MainTab.Navigator>
				<MainTab.Screen
					name='Home'
					component={MainStack}
					options={{
						headerShown: false,
						tabBarLabel: "Home",
						tabBarIcon: () => {},
						tabBarLabelStyle: {
							fontSize: 15,
							padding: 10,
						},
					}}
				/>
				<MainTab.Screen
					name='New Deck'
					component={CreateDecks}
					options={{
						tabBarIcon: () => {},
						tabBarLabelStyle: { fontSize: 15, padding: 10 },
					}}
				/>
			</MainTab.Navigator>
		</NavigationContainer>
	);
}

const HomeStack = createStackNavigator();
export default function MainStack() {
	return (
		<HomeStack.Navigator>
			<HomeStack.Screen name='Deck Collection' component={DeckCollection} />
			<HomeStack.Screen name='Deck' component={DeckOverview} />
			<HomeStack.Screen name='Quiz' component={Quiz} />
			<HomeStack.Screen name='AddCard' component={AddCard} />
		</HomeStack.Navigator>
	);
}
