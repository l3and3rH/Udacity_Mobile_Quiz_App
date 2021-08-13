import AsyncStorage from "@react-native-async-storage/async-storage";

const storage_Key = "MobileFlashCards_";

export const getDecks = async () => {
	try {
		const jsonValue = await AsyncStorage.getItem(storage_Key);

		return jsonValue != null ? JSON.parse(jsonValue) : null;
	} catch (e) {
		console.log(
			"Error while fetching Data from AsyncStorag return value: " +
				jsonValue +
				"Error: " +
				e
		);
	}
};

export const saveDeckTitle = async (deckTitle) => {
	const deckCollection = await getDecks();

	if (deckCollection === null) {
		const deckFile = { [deckTitle]: { title: deckTitle, questions: [] } };
		const jsonValue = JSON.stringify(deckFile);
		try {
			await AsyncStorage.setItem(storage_Key, jsonValue);
		} catch (e) {
			console.log("Error while updating Data to AsyncStorag. Error: " + e);
		}
	} else {
		deckCollection[deckTitle] = { title: deckTitle, questions: [] };

		const deckCollectionNew = JSON.stringify(deckCollection);
		try {
			await AsyncStorage.setItem(storage_Key, deckCollectionNew);
		} catch (e) {
			console.log("Error while updating Data to AsyncStorag. Error: " + e);
		}
	}
};

export const addCardToDeck = async (deckTitle, inputFieldQ, inputFieldA) => {
	const deckCollection = await getDecks();

	deckCollection[deckTitle].questions.push({
		question: inputFieldQ,
		answer: inputFieldA,
	});
	try {
		const jsonValue = JSON.stringify(deckCollection);
		await AsyncStorage.setItem(storage_Key, jsonValue);
	} catch (e) {
		console.log("Error while updating Data to AsyncStorag. Error: " + e);
	}
};
