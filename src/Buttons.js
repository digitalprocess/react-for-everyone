import styled from 'styled-components'

export const CTA = styled.button`
	cursor: pointer;
	position: relative;
	display: inline-block;
	outline: none;
	border: 0;
	vertical-align: middle;
	text-decoration: none;
	background: transparent;
	padding: 0;
	font-size: inherit;
	font-family: inherit;
	width: 12rem;
	height: auto;
	.circle {
		transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
		position: relative;
		display: block;
		margin: 0;
		width: 3rem;
		height: 3rem;
		background: #282936;
		border-radius: 1.625rem;
	}
	.circle .icon {
		transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
		position: absolute;
		top: 0;
		bottom: 0;
		margin: auto;
		background: #fff;
	}
	.circle .icon.arrow {
		transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
		left: 0.625rem;
		width: 1.125rem;
		height: 0.125rem;
		background: none;
	}
	.circle .icon.arrow::before {
		position: absolute;
		content: '';
		top: -0.25rem;
		right: 0.0625rem;
		width: 0.625rem;
		height: 0.625rem;
		border-top: 0.125rem solid #fff;
		border-right: 0.125rem solid #fff;
		transform: rotate(45deg);
	}
	.button-text {
		transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		padding: 0.75rem 0;
		margin-left: 3rem;
		color: #282936;
		font-weight: 700;
		line-height: 1.6;
		text-align: center;
		text-transform: uppercase;
	}
	&:hover .circle {
		width: calc(100% + 1rem);
	}
	&:hover .circle .icon.arrow {
		background: #fff;
		transform: translate(1rem, 0);
	}
	&:hover .button-text {
		color: #fff;
	}
`

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
