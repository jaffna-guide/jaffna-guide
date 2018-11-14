import * as React from 'react';

import PlacesMap from './PlacesMap';
import PlacesList from './PlacesList';

const PlacesDashboard = ({ category }) => {
	return (
		<div className="places-dashboard">
			<div className="places-dashboard__map">
        <PlacesMap category={category} />
      </div>
			<div className="places-dashboard__list">
        <PlacesList category={category} />
      </div>
		</div>
	);
};

export default PlacesDashboard;
