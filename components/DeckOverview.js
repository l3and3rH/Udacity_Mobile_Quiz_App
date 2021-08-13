import React, { Component } from "react";
import { Animated } from "react-native";
import styled from "styled-components";
import ButtonMain from "./ButtonMain";

export default class DeckOverview extends Component {
	state = {
		opacity: new Animated.Value(0),
	};

	componentDidMount() {
		const { opacity } = this.state;

		Animated.timing(opacity, {
			toValue: 1,
			duration: 5000,
			useNativeDriver: true,
		}).start();
	}
	render() {
		const { navigation, route } = this.props;
		const { title, questions } = route.params;
		const { opacity } = this.state;
		return (
			<Container>
				<Animated.Text style={{ opacity, fontSize: 48 }}>{title}</Animated.Text>
				<TextCards>{questions.length} cards</TextCards>
				<ButtonSecond
					onPress={() => navigation.navigate("AddCard", { title, questions })}>
					<SecondButtonText>Add Card</SecondButtonText>
				</ButtonSecond>
				<ButtonMain
					onPressFunction={() =>
						navigation.navigate("Quiz", { title, questions })
					}
					text='Start Quiz'
				/>
			</Container>
		);
	}
}

const Container = styled.View`
	flex: 1;
	background-color: white;
	align-items: center;
	justify-content: center;
`;
const TextDeck = styled.Text`
	font-size: 48px;
	font-weight: 500;
`;

const TextCards = styled.Text`
	font-size: 28px;
	color: gray;
	font-weight: 500;
`;

const ButtonSecond = styled.TouchableHighlight`
	border-width: 3px;
	background-color: white;
	color: white;
	border-radius: 10px;
	padding: 15px 80px;
	justify-content: center;
	align-items: center;
	margin-top: 80px;
`;
const SecondButtonText = styled.Text`
	color: black;
	font-size: 18px;
`;
