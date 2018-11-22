import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

@withRouter
@inject('AuthStore')
@observer
class PlacesBallot extends React.Component {
	render() {
		const { place, match, AuthStore } = this.props;

		return (
			<div className="places-ballot">
				<div className="places-ballot__votes-box">
					<div className="places-ballot__votes-box-count">{place.votes}</div>
					<div className="places-ballot__votes-box-label">votes</div>
				</div>
				{!AuthStore.isAuthenticated && !AuthStore.state === 'pending' ? (
					<a className="places-ballot__login-link btn btn-link" href={`/auth/facebook?redirect=${match.url}`}>
						Login w/ Facebook
					</a>
				) : AuthStore.hasCastedVoteForCurrentPlace ? (
					<button className="places-ballot__voted-button btn">{AuthStore.currentPlaceVotes} votes</button>
				) : (
					<div className="places-ballot__votes-popover popover popover-left">
						<a className="places-ballot__votes-button btn btn-block btn-sm" href="#vote">
							vote
						</a>
						<div className="popover-container">
							<div className="card">
								<div className="card-header">
									<div className="places-ballot__votes-title card-title">Vote</div>
									<div className="places-ballot__votes-subtitle card-subtitle">
										Make your voice count!
									</div>
								</div>
								<div className="card-body">
									We conduct an annual voting on the popularity of listed entities in any given
									category. Each authenticated user has a total of <strong>10</strong> votes per
									category to give away.
								</div>
								<div className="card-footer">
									<div className="btn-group btn-group-block">
										<button
											className="places-ballot__votes-button btn"
											onClick={() => AuthStore.vote(1)}
										>
											1 vote
										</button>
										<button
											className="places-ballot__votes-button btn"
											onClick={() => AuthStore.vote(2)}
										>
											2 votes
										</button>
										<button
											className="places-ballot__votes-button btn"
											onClick={() => AuthStore.vote(3)}
										>
											3 votes
										</button>
									</div>
									<button className="places-ballot__votes-button btn btn-link">Remove votes</button>
									{AuthStore.authUser && (
										<div className="places-ballot__votes-remaining">
											{`You have ${AuthStore.authUser.votes.culture} vote${AuthStore.authUser
												.votes.culture > 1
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
		);
	}
}

export default PlacesBallot;
