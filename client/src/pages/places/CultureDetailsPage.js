import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

import { Carousel } from '../../components/molecules';
import PlacesBallot from './PlacesBallot';

@withRouter
@inject('AuthStore')
@inject('PlaceStore')
@observer
class CultureDetails extends React.Component {
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
			<div className="culture-details">
				<div className="culture-details__header">
					<div className="culture-details__heading">
						<h1 className="culture-details__title">{place.name.en}</h1>
						<h2 className="culture-details__subtitle">{place.name.ta}</h2>
					</div>
					<div className="culture-details__ballot">
						<PlacesBallot place={place} />
					</div>
				</div>
				<div className="culture-details__carousel">
					<Carousel name={place.name.en} images={place.images} />
				</div>
				<div className="culture-details__description">
					<div className="culture-details__description--en">{place.description.en}</div>
					<div className="culture-details__description--ta">{place.description.ta}</div>
				</div>
			</div>
		);
	}
}

export default CultureDetails;
