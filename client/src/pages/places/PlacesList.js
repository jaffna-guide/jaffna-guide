import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

@withRouter
@inject('PlaceStore')
@observer
class PlacesList extends React.Component {
	render() {
		const { PlaceStore, history } = this.props;

		return (
			<div className="places-list">
				{PlaceStore[this.props.category].map((place) => (
					<div
						key={place.body}
						className="places-list__item"
						onClick={() => setTimeout(() => PlaceStore.selectPlace(place._id), 100)}
						onDoubleClick={() => history.push(`/${place.body}`)}
					>
						<div className="places-list__left">
							<div className="places-list__title">{place.name.en}</div>
							<div className="places-list__subtitle">{place.name.ta}</div>
						</div>
						<div className="places-list__right">
							<img className="places-list__cover" alt={`${place.name.en} Cover`} src={place.cover} />
						</div>
					</div>
				))}
			</div>
		);
	}
}

export default PlacesList;
