import { action } from 'mobx';
import axios from 'axios';

import PlaceStore from './PlaceStore';
import AuthStore from './AuthStore';

class VoteStore {
	@action
	vote = async (placeId, votes) => {
		const res = await axios.post(`/api/places/${placeId}/vote`, { votes });
    const updatedVotes = res.data;
    
    const currentPlace = PlaceStore.currentPlace();
    currentPlace.votes = updatedVotes.place;

    const authUser = AuthStore.authUser;
    authUser[currentPlace.category.body].votes = updatedVotes.user;
  };
}

const store = new VoteStore();

export default store;
