import * as React from 'react';
import { observer, inject } from 'mobx-react';

import CultureDetailsPage from './CultureDetailsPage';
import RestaurantsDetailsPage from './RestaurantsDetailsPage';
import HotelsDetailsPage from './HotelsDetailsPage';
import EducationDetailsPage from './EducationDetailsPage';

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
				case 'hotels':
					return <HotelsDetailsPage place={PlaceStore.currentPlace} />;
				case 'restaurants':
					return <RestaurantsDetailsPage place={PlaceStore.currentPlace} />;
				case 'education':
					return <EducationDetailsPage place={PlaceStore.currentPlace} />;
				default:
					return null;
			}
		}

		return null;
	}
}

export default PlaceDetails;
