import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { Route, Redirect } from 'react-router-dom';
import Spinner from 'react-spinkit';

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

		return (
			<Route
				{...rest}
				render={(props) => {
					if (AuthStore.state === 'pending' || AuthStore.state === 'initial') {
						return (
							<div className="spinner-main">
								<Spinner className="spinner-main__spinner" name="line-scale" />
							</div>
						);
					} else if (AuthStore.authUser && AuthStore.isAdmin) {
						return <Component {...props} />;
					} else if (AuthStore.isAuthenticated || AuthStore.authenticationFailed) {
						return <Redirect to="/" />;
					} else {
						window.location.href = `/auth/facebook?redirect=${this.props.path}`;
					}
				}}
			/>
		);
	}
}

export default AdminRoute;
