import { registerRootComponent } from "expo";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { View } from "react-native";
import { MainNav } from "./navigation/Navigation";

export default function App() {
	return (
		<View style={{ flex: 1 }}>
			<StatusBar style='auto' />
			<MainNav />
		</View>
	);
}
registerRootComponent(App);
