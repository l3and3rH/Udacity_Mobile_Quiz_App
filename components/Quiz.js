import React, { Component } from "react";
import { View, Text, SafeAreaView } from "react-native";
import ButtonMain from "./ButtonMain";
import styled from "styled-components";
import { registerForPushNotificationsAsync } from "../helpers/Notifications";

export class Quiz extends Component {
	constructor(props) {
		super(props);
		this.state = {
			counter: 0,
			reveal: false,
			correct: 0,
		};
	}
	componentDidMount() {
		registerForPushNotificationsAsync();
	}

	render() {
		const { questions, title } = this.props.route.params;
		if (questions.length === 0) {
			return <Text>Sorry, you cannot take a Quiz with no Cards</Text>;
		} else if (questions.length === this.state.counter) {
			return (
				<View>
					<HeaderText>
						Congrats, you answerd {this.state.correct} questions correct!
					</HeaderText>
					<Text
						style={{
							color: "blue",
							fontSize: 25,
							margin: 40,
							textAlign: "center",
						}}
						onPress={() => this.setState({ counter: 0, correct: 0 })}>
						Restart
					</Text>
					<ButtonMain
						onPressFunction={() =>
							this.props.navigation.navigate("Deck", {
								title: title,
								questions: questions,
							})
						}
						text='Home'
					/>
				</View>
			);
		}
		return (
			<SafeAreaView style={{ flex: 1 }}>
				<Container>
					<Text>
						{this.state.counter}/{questions.length}
					</Text>
					<View>
						{this.state.reveal ? (
							<Text style={{ fontSize: 20, marginTop: 45 }}>
								{questions[this.state.counter].answer}
							</Text>
						) : (
							<HeaderText>{questions[this.state.counter].question}</HeaderText>
						)}
					</View>
					<Text
						style={{ color: "blue", fontSize: 16, marginTop: 45 }}
						onPress={() => this.setState({ reveal: !this.state.reveal })}>
						{this.state.reveal ? "Question" : "Answer"}
					</Text>
				</Container>
				<Container style={{ flex: 1 }}>
					<ButtonMainStyled
						style={{ backgroundColor: "green" }}
						onPress={() =>
							this.setState({
								counter: this.state.counter + 1,
								correct: this.state.correct + 1,
								reveal: false,
							})
						}>
						<MainButtonText>Correct</MainButtonText>
					</ButtonMainStyled>
					<ButtonMainStyled
						style={{ marginBottom: 100 }}
						onPress={() => this.setState({ counter: this.state.counter + 1 })}>
						<MainButtonText>Wrong</MainButtonText>
					</ButtonMainStyled>
				</Container>
			</SafeAreaView>
		);
	}
}

const Container = styled.View`
	justify-content: flex-end;
	background-color: white;
	align-items: center;
`;

const ButtonMainStyled = styled.TouchableOpacity`
	border-width: 0px;
	background-color: red;
	padding: 15px 80px;
	justify-content: center;
	align-items: center;
	margin-top: 15px;
	justify-content: flex-end;
	border-radius: 25px;
`;
const MainButtonText = styled.Text`
	color: white;
	font-size: 18px;
`;
const HeaderText = styled.Text`
	font-size: 45px;
	text-align: center;
	padding: 30px 20px 20px 20px;
`;
export default Quiz;
