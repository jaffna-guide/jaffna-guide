import * as React from 'react';
import { observer, inject } from 'mobx-react';

import CultureDetailsPage from './CultureDetails';
import RestaurantDetailsPage from './RestaurantDetails';

@inject('PlaceStore')
@observer
class PlaceDetails extends React.Component {
	state = {};

	render() {
		const { PlaceStore } = this.props;
		PlaceStore.setCurrentPlace(this.props.match.params.place);

		if (PlaceStore.currentPlace) {
			switch (PlaceStore.currentPlace.category.body) {
				case 'culture':
					return <CultureDetailsPage place={PlaceStore.currentPlace} />;
				case 'restaurant':
					return <RestaurantDetailsPage place={PlaceStore.currentPlace} />;
				default:
					return null;
			}
		}

		return null;
	}
}

export default PlaceDetails;
