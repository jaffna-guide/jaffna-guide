import * as React from 'react';
import { Marker } from 'google-maps-react';

const PlaceMarker = ({ body }) => {
	return <div className="places-map__marker">{body}</div>;
};

export default PlaceMarker;
