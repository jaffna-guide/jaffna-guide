import * as React from 'react';
import { inject } from 'mobx-react';

import PlacesDashboard from './PlacesDashboard';

@inject('PlaceStore')
class CulturePage extends React.Component {
	componentDidMount() {
		this.props.PlaceStore.fetchPlaces('culture');
	}

	render() {
		return (
			<div className="culture">
				<PlacesDashboard category="culture" />
			</div>
		);
	}
}

export default CulturePage;
