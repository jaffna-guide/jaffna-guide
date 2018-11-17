import * as React from 'react';
import { inject, observer } from 'mobx-react';

@inject('PlaceStore')
@observer
class PlacesList extends React.Component {
	render() {
		const { PlaceStore } = this.props;

		return (
			<div className="places-list">
				{PlaceStore[this.props.category].map((place) => (
					<div key={place.body} className="places-list__item">
						<div className="places-list__left">
							<div className="places-list__title">{place.name.en}</div>
							<div className="places-list__subtitle">{place.name.ta}</div>
						</div>
						<div className="places-list__right">
							<img className="places-list__marker" alt={`${place.name.en} Marker`} src={place.marker} />
						</div>
					</div>
				))}
			</div>
		);
	}
}

export default PlacesList;
