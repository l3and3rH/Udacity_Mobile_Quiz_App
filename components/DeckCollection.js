import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import styled from "styled-components";
import { getDecks } from "../helpers/asyncStotageAPI";

function DeckCollection(props) {
	const [loaded, setLoaded] = useState(false);
	const [decks, setDecks] = useState({});
	const [token, setToken] = useState("");

	useEffect(() => {
		getDecks().then((decks) => {
			setLoaded(true);
			setDecks(decks);
		});

		const unsubscribe = props.navigation.addListener("focus", () => {});
		return () => {
			unsubscribe();
		};
	});

	if (loaded === false || decks === null) {
		return (
			<Container>
				<TextDeck>No Decks found</TextDeck>
			</Container>
		);
	}
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView style={{ flex: 1 }}>
				{Object.keys(decks).map((deck) => {
					const { title, questions } = decks[deck];

					return (
						<Container
							key={title}
							onPress={() =>
								props.navigation.navigate("Deck", {
									title: title,
									questions: questions,
								})
							}>
							<TextDeck>{title}</TextDeck>
							<TextCards>{questions.length} cards</TextCards>
						</Container>
					);
				})}
			</ScrollView>
		</SafeAreaView>
	);
}

const Container = styled.TouchableOpacity`
	flex: 1;
	background-color: white;
	align-items: center;
	justify-content: center;
	min-height: 150px;
	border-bottom-color: gray;
	border-bottom-width: 2px;
	margin: 0px 40px;
`;
const TextDeck = styled.Text`
	font-size: 25px;
	font-weight: 500;
`;

const TextCards = styled.Text`
	font-size: 18px;
	color: gray;
	font-weight: 500;
`;

export default DeckCollection;
