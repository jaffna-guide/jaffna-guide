import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import MediaQuery from 'react-responsive';

@withRouter
@inject('VoteStore')
@inject('AuthStore')
@observer
class PlacesBallot extends React.Component {
	renderPopover = (AuthStore, VoteStore, category) => {
		const { authUser } = AuthStore;
		return (
			<div>
				<a
					className={`places-ballot__votes-button btn btn-block btn-sm ${AuthStore.hasCastedVoteForCurrentPlace
						? 'btn-primary'
						: ''}`}
					href="#vote"
				>
					{`${AuthStore.hasCastedVoteForCurrentPlace
						? `${AuthStore.currentPlaceVotes} `
						: ''}vote${AuthStore.currentPlaceVotes > 1 ? 's' : ''}`}{' '}
				</a>
				<div className="popover-container">
					<div className="card">
						<div className="card-header">
							<div className="places-ballot__votes-title card-title">Vote</div>
							<div className="places-ballot__votes-subtitle card-subtitle">Make your voice count!</div>
						</div>
						<div className="card-body">
							We conduct a voting on the popularity of Jaffna's treasures. Each authenticated user has a
							total of <strong>10</strong> votes per category to give away.
						</div>
						<div className="card-footer">
							<div className="places-ballot__votes-buttons btn-group btn-group-block">
								<button
									className={`places-ballot__votes-button btn ${AuthStore.currentPlaceVotes === 1
										? 'btn-primary'
										: ''} ${VoteStore.state === 'pendingVote1' ? 'loading' : ''}`}
									onClick={() => VoteStore.vote(1)}
									disabled={authUser && authUser.votes[category] < 1}
								>
									1 vote
								</button>
								<button
									className={`places-ballot__votes-button btn ${AuthStore.currentPlaceVotes === 2
										? 'btn-primary'
										: ''} ${VoteStore.state === 'pendingVote2' ? 'loading' : ''}`}
									onClick={() => VoteStore.vote(2)}
									disabled={authUser && authUser.votes[category] < 2}
								>
									2 votes
								</button>
								<button
									className={`places-ballot__votes-button btn ${AuthStore.currentPlaceVotes === 3
										? 'btn-primary'
										: ''} ${VoteStore.state === 'pendingVote3' ? 'loading' : ''}`}
									onClick={() => VoteStore.vote(3)}
									disabled={authUser && authUser.votes[category] < 3}
								>
									3 votes
								</button>
							</div>
							{AuthStore.hasCastedVoteForCurrentPlace && (
								<button
									className="places-ballot__votes-button places-ballot__votes-button--remove btn btn-link"
									onClick={VoteStore.undoVote}
								>
									Remove votes
								</button>
							)}
							{AuthStore.authUser && (
								<div className="places-ballot__votes-remaining">
									{`You have ${AuthStore.authUser.votes[category]} vote${AuthStore.authUser.votes[
										category
									] > 1
										? 's'
										: ''} left!`}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	};

	render() {
		const { place, category, match, AuthStore, VoteStore } = this.props;

		return (
			<div className="places-ballot">
				<div className="places-ballot__votes-box">
					<div className="places-ballot__votes-box-count">{place.votes}</div>
					<div className="places-ballot__votes-box-label">{`vote${place.votes !== 1 ? 's' : ''}`}</div>
				</div>
				{!AuthStore.isAuthenticated && !AuthStore.state === 'pending' ? (
					<a className="places-ballot__login-link btn btn-link" href={`/auth/facebook?redirect=${match.url}`}>
						Login w/ Facebook
					</a>
				) : (
					<MediaQuery minWidth={768}>
						{(match) =>
							match ? (
								<div className="places-ballot__votes-popover popover popover-left">
									{this.renderPopover(AuthStore, VoteStore, category)}
								</div>
							) : (
								<div className="places-ballot__votes-popover popover popover-bottom">
									{this.renderPopover(AuthStore, VoteStore, category)}
								</div>
							)}
					</MediaQuery>
				)}
			</div>
		);
	}
}

export default PlacesBallot;
