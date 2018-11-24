import * as React from 'react';
import PlacesDashboard from './PlacesDashboard';

const RestaurantsPage = () => {
	return (
		<div className="restaurants">
			<PlacesDashboard category="restaurants" />
		</div>
	);
};

export default RestaurantsPage;
