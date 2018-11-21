import * as React from 'react';
import { inject, observer } from 'mobx-react';

import { Carousel } from '../../components/molecules';

@inject('PlaceStore')
@observer
class CultureDetails extends React.Component {
	render() {
		const { PlaceStore } = this.props;
		const place = PlaceStore.currentPlace;

		return (
			<div className="culture-details">
				<div className="culture-details__header">
					<h1 className="culture-details__title">{place.name.en}</h1>
					<h2 className="culture-details__subtitle">{place.name.ta}</h2>
				</div>
				<div className="culture-details__carousel">
					<Carousel name={place.name.en} images={place.images} />
				</div>
			</div>
		);
	}
}

export default CultureDetails;
