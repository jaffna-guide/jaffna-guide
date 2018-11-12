import * as React from 'react';
import { inject, observer } from 'mobx-react';

@inject('AuthStore')
@observer
class LoginWelcome extends React.Component {
	componentDidMount() {
		const { AuthStore } = this.props;
		const token = localStorage.getItem('token');
		if (token) {
			AuthStore.authenticate();
		}
	}

	render() {
		const { AuthStore } = this.props;

		return (
			<div className="login-welcome">
				{AuthStore.username ? (
					<div className="login-welcome__success">
						<div className="login-welcome__text">
							Welcome, <span className="login-welcome__username">{AuthStore.username}</span> :)
						</div>
						<button className="login-welcome__logout btn btn-link" onClick={AuthStore.logout}>
							Logout
						</button>
					</div>
				) : (
					<a className="login-welcome__link" href="/auth/facebook?redirect=/">
						Login w/ Facebook
					</a>
				)}
			</div>
		);
	}
}

export default LoginWelcome;
