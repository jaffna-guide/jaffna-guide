import * as React from 'react';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';
import { inject, observer } from 'mobx-react';
import MediaQuery from 'react-responsive';

@GoogleApiWrapper({ apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY })
@inject('PlaceStore')
@observer
class PlacesMap extends React.Component {
	static defaultProps = {
		zoom: 13,
	};

	handleMarkerClick = (props, marker, e) => {
		const { PlaceStore } = this.props;
		PlaceStore.selectPlace(props.placeId);
		PlaceStore.setActiveMarker(marker);
	};

	renderMarkers = () => {
		const { PlaceStore, google } = this.props;
		const places = PlaceStore[this.props.category];

		return places.map((place) => (
			<Marker
				key={place.body}
				placeId={place._id}
				onClick={this.handleMarkerClick}
				position={{ lat: place.latitude, lng: place.longitude }}
				name={place.name.en}
				icon={{
					url: place.marker,
					anchor: new google.maps.Point(12, 68),
					scaledSize: new google.maps.Size(256, 64),
				}}
			/>
		));
	};

	render() {
		const { PlaceStore } = this.props;
		const places = PlaceStore[this.props.category];
		const selectedPlace = PlaceStore.selectedPlace;
		const initialCenter = this.props.center || (places[0] && { lat: places[0].latitude, lng: places[0].longitude });
		const center = selectedPlace && { lat: selectedPlace.latitude, lng: selectedPlace.longitude };

		return initialCenter ? (
			<div className="places-map">
				<MediaQuery query="(max-width: 480px)">
					<Map
						google={this.props.google}
						zoom={this.props.zoom}
						initialCenter={initialCenter}
						center={center}
						gestureHandling="greedy"
						scrollwheel={false}
						mapTypeControl={false}
					>
						{this.renderMarkers()}
					</Map>
				</MediaQuery>
				<MediaQuery query="(min-width: 481px)">
					<Map
						google={this.props.google}
						zoom={this.props.zoom}
						initialCenter={initialCenter}
						center={center}
						gestureHandling="greedy"
						scrollwheel
						mapTypeControl={false}
					>
						{this.renderMarkers()}
					</Map>
				</MediaQuery>
			</div>
		) : null;
	}
}

export default PlacesMap;
