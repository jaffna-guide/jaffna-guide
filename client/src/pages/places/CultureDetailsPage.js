import * as React from 'react';
import { inject, observer } from 'mobx-react';

import { Divider } from '../../components/atoms';
import { Carousel, Editor } from '../../components/molecules';
import PlacesBallot from './PlacesBallot';

@inject('AuthStore')
@inject('PlaceStore')
@observer
class CultureDetailsPage extends React.Component {
	render() {
		const { PlaceStore, AuthStore } = this.props;
		const place = PlaceStore.currentPlace;

		return (
			<div className="culture-details">
				<div className="culture-details__header">
					<div className="culture-details__heading">
						<h1 className="culture-details__title">{place.name.en}</h1>
						<h2 className="culture-details__subtitle">{place.name.ta}</h2>
					</div>
					<div className="culture-details__ballot">
						<PlacesBallot place={place} category="culture" />
					</div>
				</div>
				{place.photos.length > 0 && (
					<div className="culture-details__carousel">
						<Carousel
							place={place}
							photos={place.photos}
							onLike={PlaceStore.likePlacePhoto}
							authUser={AuthStore.authUser}
							authState={AuthStore.state}
						/>
					</div>
				)}
				<div className="culture-details__description">
					{place.description &&
					place.description.en && (
						<div className="culture-details__description--en">
							<Editor readOnly value={place.description.en} />
						</div>
					)}
					{place.description && place.description.ta && <Divider />}
					{place.description &&
					place.description.ta && (
						<div className="culture-details__description--ta">
							<Editor readOnly value={place.description.ta} />
						</div>
					)}
				</div>
			</div>
		);
	}
}

export default CultureDetailsPage;
