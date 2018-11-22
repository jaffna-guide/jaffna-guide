import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

import { Carousel } from '../../components/molecules';

@withRouter
@inject('VoteStore')
@inject('AuthStore')
@inject('PlaceStore')
@observer
class CultureDetails extends React.Component {
	componentDidMount() {
		const { AuthStore, match } = this.props;
		const token = localStorage.getItem('token');
		const { place } = match.params;

		if (token) {
			AuthStore.authenticate(place);
		}
	}

	render() {
		const { PlaceStore, AuthStore, VoteStore, match } = this.props;
		const place = PlaceStore.currentPlace;

		return (
			<div className="culture-details">
				<div className="culture-details__header">
					<div className="culture-details__heading">
						<h1 className="culture-details__title">{place.name.en}</h1>
						<h2 className="culture-details__subtitle">{place.name.ta}</h2>
					</div>
					<div className="culture-details__votes-wrapper">
						<div className="culture-details__votes-box">
							<div className="culture-details__votes-box-count">{place.votes}</div>
							<div className="culture-details__votes-box-label">votes</div>
						</div>
						{!AuthStore.isAuthenticated && !AuthStore.state === 'pending' ? (
							<a
								className="culture-details__login-link btn btn-link"
								href={`/auth/facebook?redirect=${match.url}`}
							>
								Login w/ Facebook
							</a>
						) : AuthStore.hasCastedVoteForCurrentPlace ? (
							<button className="culture-details__voted-button btn">
								{AuthStore.currentPlaceVotes} votes
							</button>
						) : (
							<div className="culture-details__votes-popover popover popover-left">
								<a className="culture-details__votes-button btn btn-block btn-sm" href="#vote">
									vote
								</a>
								<div className="popover-container">
									<div className="card">
										<div className="card-header">
											<div className="culture-details__votes-title card-title">Vote</div>
											<div className="culture-details__votes-subtitle card-subtitle">
												Make your voice count!
											</div>
										</div>
										<div className="card-body">
											We conduct an annual voting on the popularity of listed entities in any
											given category. Each authenticated user has a total of <strong>10</strong>{' '}
											votes per category to give away.
										</div>
										<div className="card-footer">
											<div className="btn-group btn-group-block">
												<button
													className="culture-details__votes-button btn"
													onClick={() => VoteStore.vote(1)}
												>
													1 vote
												</button>
												<button
													className="culture-details__votes-button btn"
													onClick={() => VoteStore.vote(2)}
												>
													2 votes
												</button>
												<button
													className="culture-details__votes-button btn"
													onClick={() => VoteStore.vote(3)}
												>
													3 votes
												</button>
											</div>
											<button className="culture-details__votes-button btn btn-link">
												Remove votes
											</button>
											{AuthStore.authUser && (
												<div className="culture-details__votes-left">
													{`You have ${AuthStore.authUser.votes.culture} vote${AuthStore
														.authUser.votes.culture > 1
														? 's'
														: ''} left!`}
												</div>
											)}
										</div>
									</div>
								</div>
							</div>
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
