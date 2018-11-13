import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';

import PlacesMap from './PlacesMap';

@inject('PlaceStore')
@observer
class Culture extends React.Component {
	state = {};

	render() {
		const { PlaceStore } = this.props;
		const nallurKovil = PlaceStore.places.find((p) => p.body === 'nallur-kandaswamy-kovil');

		console.log('nallurKovil', nallurKovil);

		return nallurKovil ? (
			<div className="culture">
				<PlacesMap
					center={{ lat: nallurKovil.latitude, lng: nallurKovil.longitude }}
					places={PlaceStore.culture}
				/>
				<Link to="/">Back</Link>
				<ul className="place-list">
					{PlaceStore.culture.map((place) => {
						return (
							<li key={place.body} className="place-list__item">
								<Link to={`/${place.body}`}>{place.name.en}</Link>
							</li>
						);
					})}
				</ul>
			</div>
		) : null;
	}
}

export default Culture;
