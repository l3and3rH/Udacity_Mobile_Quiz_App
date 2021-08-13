import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";

const notification_Key = "FlashcardNotificationswtra";

export const clearNotifications = () => {
	AsyncStorage.removeItem(notification_Key).then(
		Notifications.cancelAllScheduledNotificationsAsync()
	);
};

export const createNotifications = () => {
	return {
		title: "Whats up?",
		body: "You haven't studied yet. Take your first quiz now",
		ios: {
			sound: true,
		},
		android: {
			sound: true,
			vibrate: true,
		},
	};
};

export async function registerForPushNotificationsAsync() {
	let token;
	if (Constants.isDevice) {
		const { status: existingStatus } =
			await Notifications.getPermissionsAsync();
		let finalStatus = existingStatus;
		if (existingStatus !== "granted") {
			const { status } = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		}
		if (finalStatus !== "granted") {
			alert("Failed to get push token for push notification!");
			return;
		}
		token = (await Notifications.getExpoPushTokenAsync()).data;
		console.log(token);
	} else {
		alert("Must use physical device for Push Notifications");
	}

	if (Platform.OS === "android") {
		Notifications.setNotificationChannelAsync("default", {
			name: "default",
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: "#FF231F7C",
		});
	}

	Notifications.scheduleNotificationAsync({
		content: {
			to: token,
			sound: "default",
			title: "Study",
			body: "Take a Quiz now!",
		},
		trigger: {
			seconds: 60 * 60 * 24,
			repeats: true,
		},
	});
	return token;
}
