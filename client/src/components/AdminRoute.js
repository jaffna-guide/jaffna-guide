import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { Route, Redirect } from 'react-router-dom';

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
    
    console.log('this.props', this.props);
    console.log('AuthStore.isAuthenticated', AuthStore.isAuthenticated);
    console.log('AuthStore.isAdmin', AuthStore.isAdmin);

		return (
			<Route
				{...rest}
				render={(props) => {
					if (AuthStore.isAdmin) {
						return <Component {...props} />;
					} else if (AuthStore.isAuthenticated) {
						return <Redirect to="/" />;
					} else {
            return null;
						// window.location.href = `/auth/facebook?redirect=${this.props.path}`;
					}
				}}
			/>
		);
	}
}

export default AdminRoute;
