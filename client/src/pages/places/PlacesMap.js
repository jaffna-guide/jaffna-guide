import * as React from 'react';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';
import { inject, observer } from 'mobx-react';
import MediaQuery from 'react-responsive';
import { withRouter } from 'react-router-dom';

@GoogleApiWrapper({ apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY })
@withRouter
@inject('PlaceStore')
@observer
class PlacesMap extends React.Component {
	static defaultProps = {
		zoom: 13,
	};

	handleMarkerClick = (props, marker, e) => {
		const { history } = this.props;
		history.push(`/${marker.placeBody}`);
	};

	handleMarkerHover = (props, marker, e) => {
		const { PlaceStore } = this.props;
		PlaceStore.hoverPlace(marker.placeId);
	};

	renderMarkers = () => {
		const { PlaceStore, google } = this.props;
		const places = PlaceStore[this.props.category];

		// google.maps.Animation.DROP || google.maps.Animation.BOUNCE

		return places.map((place) => {
			const icon =
				place.marker &&
				((place._id === PlaceStore.hoveredPlaceId && place.marker.active) ||
					(place._id !== PlaceStore.hoveredPlaceId && place.marker.default))
					? {
							url: place._id === PlaceStore.hoveredPlaceId ? place.marker.active : place.marker.default,
							anchor: new google.maps.Point(12, 68),
							scaledSize:
								place._id === PlaceStore.hoveredPlaceId
									? new google.maps.Size(200, 75)
									: new google.maps.Size(53, 75),
						}
					: {};

			return (
				<Marker
					key={place.body}
					placeId={place._id}
					placeBody={place.body}
					onClick={this.handleMarkerClick}
					// onMouseover={this.handleMarkerHover}
					position={{ lat: place.latitude, lng: place.longitude }}
					name={place.name.en}
					icon={icon}
					animation={
						place._id === PlaceStore.selectedPlaceId && PlaceStore.shallMarkerAnimate ? (
							google.maps.Animation.DROP
						) : (
							0
						)
					}
					zIndex={place._id === PlaceStore.hoveredPlaceId ? 10000 : place.votes}
				/>
			);
		});
	};

	render() {
		const { PlaceStore } = this.props;
		const places = PlaceStore[this.props.category];
		const selectedPlace = PlaceStore.selectedPlace;
		const initialCenter = this.props.center || (places[0] && { lat: places[0].latitude, lng: places[0].longitude });
		const center =
			selectedPlace && PlaceStore.shallMarkerAnimate
				? { lat: selectedPlace.latitude, lng: selectedPlace.longitude }
				: {};

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
