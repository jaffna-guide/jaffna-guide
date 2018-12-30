import * as React from 'react';
import { inject } from 'mobx-react';

import PlacesDashboard from './PlacesDashboard';

@inject('PlaceStore')
class RestaurantsPage extends React.Component {
	componentDidMount() {
		this.props.PlaceStore.fetchPlaces('restaurants');
	}

	render() {
		return (
			<div className="restaurants">
				<PlacesDashboard category="restaurants" />
			</div>
		);
	}
}

export default RestaurantsPage;
