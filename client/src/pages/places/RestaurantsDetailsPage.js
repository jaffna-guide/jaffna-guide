import * as React from 'react';
import { inject, observer } from 'mobx-react';

import { Carousel } from '../../components/molecules';
import PlacesBallot from './PlacesBallot';

@inject('PlaceStore')
@observer
class RestaurantsDetailsPage extends React.Component {
	render() {
		const { PlaceStore } = this.props;
    const place = PlaceStore.currentPlace;

		return (
			<div className="restaurants-details">
				<div className="restaurants-details__header">
					<div className="restaurants-details__heading">
						<h1 className="restaurants-details__title">{place.name.en}</h1>
						<h2 className="restaurants-details__subtitle">{place.name.ta}</h2>
					</div>
					<div className="restaurants-details__ballot">
						<PlacesBallot place={place} category="restaurants" />
					</div>
				</div>
        {place.images.length > 0 && (
					<div className="restaurants-details__carousel">
						<Carousel name={place.name.en} images={place.images} />
					</div>
				)}
				<div className="restaurants-details__description">
					<div className="restaurants-details__description--en">{place.description.en}</div>
					<div className="restaurants-details__description--ta">{place.description.ta}</div>
				</div>
			</div>
		);
	}
}

export default RestaurantsDetailsPage;
