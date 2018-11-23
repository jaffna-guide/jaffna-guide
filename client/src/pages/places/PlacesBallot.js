import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import MediaQuery from 'react-responsive';

import { Icon } from '../../components/atoms';
import { ReactComponent as Facebook } from '../../assets/facebook.svg';

@withRouter
@inject('VoteStore')
@inject('AuthStore')
@observer
class PlacesBallot extends React.Component {
	renderPopover = ({
		authUser,
		currentPlaceVotes,
		hasCastedVoteForCurrentPlace,
		vote,
		undoVote,
		voteState,
		category,
	}) => {
		return (
			<div>
				<a
					className={`places-ballot__votes-button btn btn-block btn-sm ${hasCastedVoteForCurrentPlace
						? 'btn-primary'
						: ''}`}
					href="#vote"
				>
					{`${hasCastedVoteForCurrentPlace ? `${currentPlaceVotes} ` : ''}vote${currentPlaceVotes > 1
						? 's'
						: ''}`}{' '}
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
									className={`places-ballot__votes-button btn ${currentPlaceVotes === 1
										? 'btn-primary'
										: ''} ${voteState === 'pendingVote1' ? 'loading' : ''}`}
									onClick={() => vote(1)}
									disabled={authUser && authUser.votes[category] < 1}
								>
									1 vote
								</button>
								<button
									className={`places-ballot__votes-button btn ${currentPlaceVotes === 2
										? 'btn-primary'
										: ''} ${voteState === 'pendingVote2' ? 'loading' : ''}`}
									onClick={() => vote(2)}
									disabled={authUser && authUser.votes[category] < 2}
								>
									2 votes
								</button>
								<button
									className={`places-ballot__votes-button btn ${currentPlaceVotes === 3
										? 'btn-primary'
										: ''} ${voteState === 'pendingVote3' ? 'loading' : ''}`}
									onClick={() => vote(3)}
									disabled={authUser && authUser.votes[category] < 3}
								>
									3 votes
								</button>
							</div>
							{hasCastedVoteForCurrentPlace && (
								<button
									className="places-ballot__votes-button places-ballot__votes-button--remove btn btn-link"
									onClick={undoVote}
								>
									Remove votes
								</button>
							)}
							{authUser && (
								<div className="places-ballot__votes-remaining">
									{`You have ${authUser.votes[category]} vote${authUser.votes[category] > 1
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
		const { authUser, currentPlaceVotes, hasCastedVoteForCurrentPlace } = AuthStore;
		const { vote, undoVote, state } = VoteStore;

		console.log('AuthStore.isAuthenticated', AuthStore.isAuthenticated);
		console.log('AuthStore.state', AuthStore.state);

		return (
			<div className="places-ballot">
				<div className="places-ballot__votes-box">
					<div className="places-ballot__votes-box-count">{place.votes}</div>
					<div className="places-ballot__votes-box-label">{`vote${place.votes !== 1 ? 's' : ''}`}</div>
				</div>
				{!AuthStore.isAuthenticated && !AuthStore.state.startsWith('pending') ? (
					<a
						className="places-ballot__login-link btn btn-primary"
						href={`/auth/facebook?redirect=${match.url}`}
					>
						<Icon className="places-ballot__facebook-icon" icon={Facebook} />Login to Vote
					</a>
				) : (
					<MediaQuery minWidth={768}>
						{(match) =>
							match ? (
								<div className="places-ballot__votes-popover popover popover-left">
									{this.renderPopover({
										authUser,
										currentPlaceVotes,
										hasCastedVoteForCurrentPlace,
										vote,
										undoVote,
										voteState: state,
										category,
									})}
								</div>
							) : (
								<div className="places-ballot__votes-popover popover popover-bottom">
									{this.renderPopover({
										authUser,
										currentPlaceVotes,
										hasCastedVoteForCurrentPlace,
										vote,
										undoVote,
										voteState: state,
										category,
									})}
								</div>
							)}
					</MediaQuery>
				)}
			</div>
		);
	}
}

export default PlacesBallot;
