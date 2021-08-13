import React from "react";
import { SafeAreaView } from "react-native";
import styled from "styled-components";

export default function TextField({ onChangeText, value, label, fieldType }) {
	return (
		<SafeAreaView>
			<TextFieldStyle
				onChangeText={(e) => {
					onChangeText(e, fieldType);
				}}
				value={value}
				placeholder={label}
			/>
		</SafeAreaView>
	);
}

const TextFieldStyle = styled.TextInput`
	margin: 25px 15px;
	border-width: 1px;
	padding: 15px;
	border-radius: 8px;
	width: 280px;
`;
