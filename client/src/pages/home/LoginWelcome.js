import * as React from 'react';
import { inject } from 'mobx-react';

@inject('AuthStore')
class LoginWelcome extends React.Component {
	state = {};

	render() {
		const { AuthStore } = this.props;
		console.log('AuthStore', AuthStore);

		return (
			<div className="login-welcome">
				{AuthStore.authUser ? (
					`Welcome to Jaffna, ${AuthStore.authUser.displayName} :)`
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
