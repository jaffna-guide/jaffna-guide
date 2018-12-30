import * as React from 'react';
import { inject } from 'mobx-react';

import PlacesDashboard from './PlacesDashboard';

@inject('PlaceStore')
class EducationPage extends React.Component {
	componentDidMount() {
		this.props.PlaceStore.fetchPlaces('education');
	}

	render() {
		return (
			<div className="education">
				<PlacesDashboard category="education" />
			</div>
		);
	}
}

export default EducationPage;
