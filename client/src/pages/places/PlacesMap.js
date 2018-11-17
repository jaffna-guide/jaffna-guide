import * as React from 'react';
import { GoogleApiWrapper, Map } from 'google-maps-react';
import { inject } from 'mobx-react';

import PlaceMarker from './PlaceMarker';

@inject('PlaceStore')
@GoogleApiWrapper({ apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY })
class PlacesMap extends React.Component {
	static defaultProps = {
		zoom: 12,
	};

	render() {
		const { PlaceStore } = this.props;
		const places = PlaceStore[this.props.category];
		console.log('places', places);

		return (
			<div className="places-map">
				<Map
					initialCenter={this.props.center}
					defaultZoom={this.props.zoom}
					google={this.props.google}
					gestureHandling="greedy"
					scrollwheel={false}
					mapTypeControl={false}
				/>
				{/* {this.props.places.map((place) => (
						<PlaceMarker key={place.body} lat="9.676807" lng="80.011470" {...place} />
					))}
				</Map> */}
			</div>
		);
	}
}

export default PlacesMap;
