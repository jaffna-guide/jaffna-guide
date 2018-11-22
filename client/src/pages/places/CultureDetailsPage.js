import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

import { Carousel } from '../../components/molecules';

@withRouter
@inject('AuthStore')
@inject('PlaceStore')
@observer
class CultureDetails extends React.Component {
	componentDidMount() {
		console.log('this.props', this.props);
		const { AuthStore, match } = this.props;
		const token = localStorage.getItem('token');
		const { place } = match.params;

		if (token) {
			AuthStore.authenticate(place);
		}
	}

	render() {
		const { PlaceStore, AuthStore, match } = this.props;
		const place = PlaceStore.currentPlace;

		return (
			<div className="culture-details">
				<div className="culture-details__header">
					<div className="culture-details__heading">
						<h1 className="culture-details__title">{place.name.en}</h1>
						<h2 className="culture-details__subtitle">{place.name.ta}</h2>
					</div>
					<div className="culture-details__votes-wrapper">
						<div className="culture-details__votes">
							<div>{place.votes}</div>
							<div>votes</div>
						</div>
						{!AuthStore.isAuthenticated ? (
							<a className="login-welcome__link" href={`/auth/facebook?redirect=${match.url}`}>
								Login w/ Facebook
							</a>
						) : AuthStore.hasCastedVoteForCurrentPlace ? (
							<button className="culture-details__voted-button btn">
								{AuthStore.currentPlaceVotes} votes
							</button>
						) : (
							<button className="culture-details__vote-button btn">vote</button>
						)}
					</div>
				</div>
				<div className="culture-details__carousel">
					<Carousel name={place.name.en} images={place.images} />
				</div>
				<div className="culture-details__description">
					<div className="culture-details__description--en">{place.description.en}</div>
					<div className="culture-details__description--ta">{place.description.ta}</div>
				</div>
			</div>
		);
	}
}

export default CultureDetails;
