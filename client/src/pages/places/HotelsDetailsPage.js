import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

import { Carousel } from '../../components/molecules';
import PlacesBallot from './PlacesBallot';

@withRouter
@inject('AuthStore')
@inject('PlaceStore')
@observer
class HotelsDetailsPage extends React.Component {
	componentDidMount() {
		const { AuthStore, match } = this.props;
		const token = localStorage.getItem('token');
		const { place } = match.params;

		if (token) {
			AuthStore.authenticate(place);
		}
	}

	render() {
		const { PlaceStore } = this.props;
		const place = PlaceStore.currentPlace;

		return (
			<div className="hotels-details">
				<div className="hotels-details__header">
					<div className="hotels-details__heading">
						<h1 className="hotels-details__title">{place.name.en}</h1>
						<h2 className="hotels-details__subtitle">{place.name.ta}</h2>
					</div>
					<div className="hotels-details__ballot">
						<PlacesBallot place={place} category="hotels" />
					</div>
				</div>
				<div className="hotels-details__carousel">
					<Carousel name={place.name.en} images={place.images} />
				</div>
				<div className="hotels-details__description">
					<div className="hotels-details__description--en">{place.description.en}</div>
					<div className="hotels-details__description--ta">{place.description.ta}</div>
				</div>
			</div>
		);
	}
}

export default HotelsDetailsPage;
