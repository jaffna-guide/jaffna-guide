import { observable, action, computed, runInAction } from 'mobx';
import axios from 'axios';

class PlaceStore {
	@observable places = [];
	@observable state = 'pending'; // "pending" / "done" / "error"
	@observable currentPlaceBody = '';

	@action
	fetchPlaces() {
		this.places = [];
		this.state = 'pending';

		axios
			.get('/api/places')
			.then((res) => {
				const places = res.data;
				runInAction(() => {
					this.places = places;
					this.state = 'done';
				});
			})
			.catch(() => {
				runInAction(() => {
					this.places = [];
					this.state = 'error';
				});
			});
	}

	@action
	addPlace = (place) => {
		this.places.push(place);
	};

	@action
	togglePlaceActive = async (placeId) => {
		const placeToUpdate = this.places.find((p) => p._id === placeId);
		await axios.patch('/api/places', { id: placeId, active: !placeToUpdate.active });

		runInAction(() => {
			placeToUpdate.active = !placeToUpdate.active;
		});
	};

	@action
	setCurrentPlace(placeBody) {
		this.currentPlaceBody = placeBody;
	}

	@computed
	get placeCount() {
		return this.places.length;
	}

	@computed
	get currentPlace() {
		return this.places.find((place) => place.body === this.currentPlaceBody);
	}

	@computed
	get restaurants() {
		return this.places.filter((place) => place.category.body === 'restaurant');
	}

	@computed
	get hotels() {
		return this.places.filter((place) => place.category.body === 'hotel');
	}

	@computed
	get events() {
		return this.places.filter((place) => place.category.body === 'event');
	}

	@computed
	get culture() {
		return this.places.filter((place) => place.category.body === 'culture');
	}

	@computed
	get education() {
		return this.places.filter((place) => place.category.body === 'education');
	}
}

const store = new PlaceStore();

export default store;
