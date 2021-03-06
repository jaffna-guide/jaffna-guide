import { action, observable, runInAction } from 'mobx';
import axios from 'axios';

import PlaceStore from './PlaceStore';
import AuthStore from './AuthStore';

class VoteStore {
	@observable state = 'pending'; // "pendingX" / "done" / "error"

	@action
	vote = async (votesToBeAdded) => {
		this.state = `pendingVote${votesToBeAdded}`;
		const res = await axios.post(`/api/places/${PlaceStore.currentPlaceBody}/vote`, { votesToBeAdded });
		const updatedVotes = res.data;

		const currentPlace = PlaceStore.currentPlace;
		currentPlace.votes = updatedVotes.place;

		const authUser = AuthStore.authUser;
		authUser.votes[currentPlace.category.body] = updatedVotes.user;

		AuthStore.hasCastedVoteForCurrentPlace = true;
		AuthStore.currentPlaceVotes = votesToBeAdded;
		runInAction(() => {
			this.state = 'done';
		});
	};

	@action
	undoVote = async () => {
		this.state = 'pendingUndoVote';
		const res = await axios.post(`/api/places/${PlaceStore.currentPlaceBody}/vote/undo`);
		const updatedVotes = res.data;

		const currentPlace = PlaceStore.currentPlace;
		currentPlace.votes = updatedVotes.place;

		const authUser = AuthStore.authUser;
		authUser.votes[currentPlace.category.body] = updatedVotes.user;

		AuthStore.hasCastedVoteForCurrentPlace = false;
		AuthStore.currentPlaceVotes = null;
		runInAction(() => {
			this.state = 'done';
		});
	};
}

const store = new VoteStore();

export default store;
