import React from 'react';
import axiosWithAuth from '../components/utils/axiosWithAuth';

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
			<>
				<h1>Welcome to the Bubble App!</h1>

				<form onSubmit={this.login}>
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
					<button>Log in</button>
				</form>
			</>
		);
	}
}

export default Login;
