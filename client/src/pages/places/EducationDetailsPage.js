import * as React from 'react';
import { inject, observer } from 'mobx-react';

import { Carousel } from '../../components/molecules';
import PlacesBallot from './PlacesBallot';

@inject('PlaceStore')
@observer
class EducationDetailsPage extends React.Component {
	render() {
		const { PlaceStore } = this.props;
    const place = PlaceStore.currentPlace;

		return (
			<div className="education-details">
				{place.logo && (
					<div className="education-details__logo-wrapper">
						<img className="education-details__logo-image" src={place.logo} alt={`${place.name.en} Logo`} />
					</div>
				)}
				<div className="education-details__header">
					<div className="education-details__heading">
						<h1 className="education-details__title">{place.name.en}</h1>
						<h2 className="education-details__subtitle">{place.name.ta}</h2>
					</div>
					<div className="education-details__ballot">
						<PlacesBallot place={place} category="education" />
					</div>
				</div>
				{place.images.length > 0 && (
					<div className="education-details__carousel">
						<Carousel name={place.name.en} images={place.images} />
					</div>
				)}
				<div className="education-details__description">
					<div className="education-details__description--en">{place.description.en}</div>
					<div className="education-details__description--ta">{place.description.ta}</div>
				</div>
			</div>
		);
	}
}

export default EducationDetailsPage;
