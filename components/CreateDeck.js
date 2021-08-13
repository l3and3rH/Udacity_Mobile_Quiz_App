import React, { Component } from "react";
import styled from "styled-components";
import ButtonMain from "./ButtonMain";
import TextField from "./TextField";
import { saveDeckTitle } from "../helpers/asyncStotageAPI";

export default class CreateDeck extends Component {
	constructor(props) {
		super(props);

		this.state = {
			deckName: "",
		};

		this.changeText = this.changeText.bind(this);
	}

	changeText(e) {
		this.setState({ deckName: e });
	}
	render() {
		return (
			<Container>
				<HeaderText>What is the Title of your Deck?</HeaderText>
				<TextField
					onChangeText={this.changeText}
					value={this.state.deckName}
					label='Deck Title'
				/>
				<ButtonMain
					text='Submit'
					onPressFunction={() => {
						saveDeckTitle(this.state.deckName)
							.then(() => this.setState({ deckName: "" }))
							.then(() => {
								this.props.navigation.navigate("Deck Collection");
							});
					}}
				/>
			</Container>
		);
	}
}

const Container = styled.View`
	flex: 1;
	background-color: white;
	align-items: center;
	border-bottom-color: gray;
	border-bottom-width: 2px;
`;
const HeaderText = styled.Text`
	font-size: 45px;
	text-align: justify;
	padding: 30px 20px 20px 20px;
`;
