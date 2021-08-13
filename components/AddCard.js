import React, { Component } from "react";
import { View } from "react-native";
import ButtonMain from "./ButtonMain";
import TextField from "./TextField";
import { addCardToDeck } from "../helpers/asyncStotageAPI";

export default class AddCard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			inputFieldQ: "",
			inputFieldA: "",
		};

		this.changeText = this.changeText.bind(this);
	}

	changeText(e, inputField) {
		this.setState({ [inputField]: e });
	}

	render() {
		const { inputFieldQ, inputFieldA } = this.state;
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
				}}>
				<View style={{ height: 40 }} />
				<TextField
					label='Question'
					value={inputFieldQ}
					onChangeText={this.changeText}
					fieldType='inputFieldQ'
				/>
				<TextField
					label='Answer'
					value={inputFieldA}
					onChangeText={this.changeText}
					fieldType='inputFieldA'
				/>
				<ButtonMain
					onPressFunction={() => {
						console.log("pressed");
						addCardToDeck(
							this.props.route.params.title,
							inputFieldQ,
							inputFieldA
						)
							.then(this.setState({ inputFieldQ: "", inputFieldA: "" }))
							.then(() => {
								this.props.navigation.navigate("Deck Collection");
							});
					}}
					text='Submit'
				/>
			</View>
		);
	}
}
