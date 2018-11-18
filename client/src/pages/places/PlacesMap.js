import * as React from 'react';
import { GoogleApiWrapper, Map } from 'google-maps-react';
import { inject, observer } from 'mobx-react';

import PlaceMarker from './PlaceMarker';

@GoogleApiWrapper({ apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY })
@inject('PlaceStore')
@observer
class PlacesMap extends React.Component {
	static defaultProps = {
		zoom: 13,
	};

	render() {
		const { PlaceStore } = this.props;
		const places = PlaceStore[this.props.category];
		const selectedPlace = PlaceStore.selectedPlace;
		const initialCenter = this.props.center || (places[0] && { lat: places[0].latitude, lng: places[0].longitude });
		const center = selectedPlace && { lat: selectedPlace.latitude, lng: selectedPlace.longitude };

		return initialCenter ? (
			<div className="places-map">
				<Map
					google={this.props.google}
					zoom={this.props.zoom}
					initialCenter={initialCenter}
					center={center}
					gestureHandling="greedy"
					scrollwheel={false}
					mapTypeControl={false}
				/>
				{/* {this.props.places.map((place) => (
						<PlaceMarker key={place.body} lat="9.676807" lng="80.011470" {...place} />
					))}
				</Map> */}
			</div>
		) : null;
	}
}

export default PlacesMap;
