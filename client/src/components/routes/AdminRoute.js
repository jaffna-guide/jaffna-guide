import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { Route, Redirect } from 'react-router-dom';
import DevTools from 'mobx-react-devtools';

@inject('AuthStore')
@observer
class AdminRoute extends React.Component {
	componentDidMount() {
		const { AuthStore } = this.props;
		if (AuthStore.authUser === null) {
			AuthStore.authenticate();
		}
	}

	render() {
		const { AuthStore, component: Component, ...rest } = this.props;

		console.log('AuthStore.state', AuthStore.state);
		console.log('AuthStore.isAuthenticated', AuthStore.isAuthenticated);
		console.log('AuthStore.isAdmin', AuthStore.isAdmin);
		console.log('AuthStore.authUser', AuthStore.authUser);

		return (
			<Route
				{...rest}
				render={(props) => {
					if (AuthStore.state === 'pending') {
						console.log('case: pending');
						return <div>pending|{AuthStore.state}</div>;
					} else if (AuthStore.isAdmin) {
						console.log('case: admin');
						return <Component {...props} />;
					} else if (AuthStore.isAuthenticated || AuthStore.authenticationFailed) {
						console.log('case: authentication completed');
						return <Redirect to="/" />;
					} else {
						console.log('case: redirect');
						// return <div>redirect</div>;
						window.location.href = `/auth/facebook?redirect=${this.props.path}`;
					}
				}}
			/>
		);
	}
}

export default AdminRoute;
