import { action } from 'mobx';
import axios from 'axios';

import PlaceStore from './PlaceStore';
import AuthStore from './AuthStore';

class VoteStore {
	@action
	vote = async (votesToBeAdded) => {
		console.log('PlaceStore.currentPlaceBody', PlaceStore.currentPlaceBody);
		const res = await axios.post(`/api/places/${PlaceStore.currentPlaceBody}/vote`, { votesToBeAdded });
		const updatedVotes = res.data;
		console.log('updatedVotes', updatedVotes);

		const currentPlace = PlaceStore.currentPlace;
		console.log('currentPlace', currentPlace);
		currentPlace.votes = updatedVotes.place;

		const authUser = AuthStore.authUser;
		console.log('authUser', authUser);
		authUser.votes[currentPlace.category.body] = updatedVotes.user;
	};
}

const store = new VoteStore();

export default store;
