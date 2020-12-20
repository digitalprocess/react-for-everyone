import styled from 'styled-components'

export const Button = styled.button `
	color: #333;
	cursor: pointer;
	font-size: 16px;
	font-weight: bold;
	padding: 15px 32px;
	border-radius: 3px;
	text-align: center;
	text-decoration: none;
	transition-duration: 0.4s;
	border: 2px solid #333;
	text-transform: uppercase;
	background-color: white;
	&:hover {
		color: white;
		background-color: #333;
		border: 2px solid #333;
	}
`
