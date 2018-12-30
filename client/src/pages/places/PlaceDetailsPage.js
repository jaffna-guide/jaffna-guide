import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

import CultureDetailsPage from './CultureDetailsPage';
import RestaurantsDetailsPage from './RestaurantsDetailsPage';
import HotelsDetailsPage from './HotelsDetailsPage';
import EducationDetailsPage from './EducationDetailsPage';
import VillagesDetailsPage from './VillagesDetailsPage';

@withRouter
@inject('AuthStore')
@inject('PlaceStore')
@observer
class PlaceDetailsPage extends React.Component {
	componentDidMount() {
		const { PlaceStore } = this.props;
		PlaceStore.fetchCurrentPlace(this.props.match.params.place);

		const { AuthStore, match } = this.props;
		const token = localStorage.getItem('token');
		const { place } = match.params;

		if (token) {
			AuthStore.authenticate(place);
		}
	}

	componentWillUnmount() {
		const { PlaceStore } = this.props;
		PlaceStore.unsetCurrentPlace();
		PlaceStore.unsetSelectedPlace();
	}

	render() {
		const { PlaceStore } = this.props;

		if (PlaceStore.currentPlace) {
			switch (PlaceStore.currentPlace.category.body) {
				case 'culture':
					return <CultureDetailsPage place={PlaceStore.currentPlace} />;
				case 'hotels':
					return <HotelsDetailsPage place={PlaceStore.currentPlace} />;
				case 'restaurants':
					return <RestaurantsDetailsPage place={PlaceStore.currentPlace} />;
				case 'villages':
					return <VillagesDetailsPage place={PlaceStore.currentPlace} />;
				case 'education':
					return <EducationDetailsPage place={PlaceStore.currentPlace} />;
				default:
					return null;
			}
		}

		return null;
	}
}

export default PlaceDetailsPage;
