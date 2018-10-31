import { observable, action, computed } from 'mobx';

class PlaceStore {
	@observable places = [];
	@observable state = 'pending'; // "pending" / "done" / "error"

	@action
	fetchPlaces() {
		this.places = [];
		this.state = 'pending';
	}

	@action
	addPlace = (place) => {
		this.places.push(place);
	};

	@computed
	get placeCount() {
		return this.places.length;
	}
}

const store = new PlaceStore();

export default store;
