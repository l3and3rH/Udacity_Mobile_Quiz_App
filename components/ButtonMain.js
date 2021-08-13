import React from "react";
import styled from "styled-components";

export default function ButtonMain({ onPressFunction, text }) {
	return (
		<ButtonMainStyled onPress={onPressFunction}>
			<MainButtonText>{text}</MainButtonText>
		</ButtonMainStyled>
	);
}
const ButtonMainStyled = styled.TouchableOpacity`
	border-width: 3px;
	background-color: black;
	color: white;
	border-radius: 10px;
	padding: 15px 80px;
	justify-content: center;
	align-items: center;
	margin-top: 15px;
`;
const MainButtonText = styled.Text`
	color: white;
	font-size: 18px;
`;
