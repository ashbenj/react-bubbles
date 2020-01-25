import React from 'react';
import axiosWithAuth from '../components/utils/axiosWithAuth';
import styled from 'styled-components';

class Login extends React.Component {
	state = {
		credentials: {
			username: '',
			password: ''
		}
	};

	// make a post request to retrieve a token from the api
	// when you have handled the token, navigate to the BubblePage route

	login = e => {
		e.preventDefault();
		axiosWithAuth()
			.post('http://localhost:5000/api/login', this.state.credentials)
			.then(res => {
				console.log(this.props.history);
				localStorage.setItem('token', res.data.payload);
				this.props.history.push('/protected');
			})
			.catch(err => console.log(err.response));
	};

	handleChange = e => {
		this.setState({
			credentials: {
				...this.state.credentials,
				[e.target.name]: e.target.value
			}
		});
	};

	render() {
		return (
			<AppDiv>
				<h1>Welcome to the Bubble App!</h1>

				<FormDiv onSubmit={this.login}>
					<input
						type='text'
						name='username'
						placeholder='Username'
						value={this.state.credentials.username}
						onChange={this.handleChange}
					/>
					<input
						type='text'
						name='password'
						placeholder='Password'
						value={this.state.credentials.password}
						onChange={this.handleChange}
					/>
					<StyledButton>Log in</StyledButton>
				</FormDiv>
			</AppDiv>
		);
	}
}

export default Login;

const FormDiv = styled.form`
	background: #ffffff;
	box-shadow: 0 5px 10px rgba(0, 0, 0, 0.12), 0 5px 2px rgba(0, 0, 0, 0.24);
	width: 100%;
	height: 13em;
	max-width: 300px;
	padding: 15px;
	margin: 16px auto;
	margin-right: 20em;
	text-align: center;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	h2 {
		margin-top: 0;
		margin-bottom: 5%;
		color: black;
	}
	input {
		padding: 6px;
		background: none;
		glowing-border: 1px solid #dadada;
		border-radius: 7px;
		outline: none;
		border-color: #9ecaed;
		box-shadow: 0 0 10px #9ecaed;
		color: black;
		border-bottom: 1px solid white;
		margin-top: 0;
		font-size: 1em;

		::placeholder {
			color: grey;
			font-size: 0.5em;
		}
	}
`;

const AppDiv = styled.div`
	text-align: center;
	background-color: #fffff;
	padding-top: 5px;
	padding-bottom: 5px;
	font-size: 1 em;
	font-family: 'Contrail One';
	h1 {
		margin-top: 1%;
		margin-left: 4em;
		font-size: 4em;
	}
	a {
		font-size: 1.5em;
		padding: 5%;
		margin-bottom: 50%;
		text-decoration: none;
		color: black;
	}
`;

const StyledButton = styled.button`
	background: white;
	font-size: 1em;
	margin: 0.5em;
	margin-right: 1em;
	padding: 0.25em 0.75em;
	// border: none;
	// border-radius: 3px;
	glowing-border: 1px solid #dadada;
	border-radius: 7px;
	outline: none;
	border-color: #9ecaed;
	box-shadow: 0 0 10px #9ecaed;
	color: grey;
`;
