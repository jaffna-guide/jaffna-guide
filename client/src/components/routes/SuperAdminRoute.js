import * as React from 'react';
import { observer, inject } from 'mobx-react';

@inject('AuthStore')
@observer
class SuperAdminRoute extends React.Component {
	state = {};

	render() {
		return <div>{this.props.children}</div>;
	}
}

export default SuperAdminRoute;
