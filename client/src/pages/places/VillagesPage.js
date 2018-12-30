import * as React from 'react';
import { inject } from 'mobx-react';

import PlacesDashboard from './PlacesDashboard';

@inject('PlaceStore')
class VillagesPage extends React.Component {
	componentDidMount() {
		this.props.PlaceStore.fetchPlaces('villages');
	}

	render() {
		return (
			<div className="villages">
				<PlacesDashboard category="villages" />
			</div>
		);
	}
}

export default VillagesPage;
