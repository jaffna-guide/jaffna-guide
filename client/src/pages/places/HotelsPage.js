import * as React from 'react';
import { inject } from 'mobx-react';

import PlacesDashboard from './PlacesDashboard';

@inject('PlaceStore')
class HotelsPage extends React.Component {
	componentDidMount() {
		this.props.PlaceStore.fetchPlaces('hotels');
	}

	render() {
		return (
			<div className="hotels">
				<PlacesDashboard category="hotels" />
			</div>
		);
	}
}

export default HotelsPage;
