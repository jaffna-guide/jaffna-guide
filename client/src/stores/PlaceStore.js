import { observable, action, computed, runInAction } from 'mobx';
import axios from 'axios';

class PlaceStore {
	@observable places = [];
	@observable state = 'pending'; // "pending" / "done" / "error"
	@observable selectedPlaceId = null;
	@observable currentPlaceBody = '';
	@observable createEditPlaceModalVisible = false;

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
	createPlace = async (place) => {
		const res = await axios.post('/api/places', place);
		this.createEditPlaceModalVisible = false;
		this.places.push(res.data);
	};

	@action
	editPlace = async (place) => {
		const res = await axios.patch('/api/places', place);
		const index = this.places.findIndex((p) => p._id === place.id);

		runInAction(() => {
			this.places.splice(index, 1, res.data);
			this.createEditPlaceModalVisible = false;
			this.selectedPlaceId = null;
		});
	};

	@action
	deletePlace = async (placeId) => {
		const res = await axios.delete(`/api/places/${placeId}`);
		if (res.status === 200) {
			const index = this.places.map((p) => p.id).indexOf(placeId);
			runInAction(() => {
				this.places.splice(index, 1);
			});
		}
	};

	@action
	selectPlace = (placeId) => {
		this.selectedPlaceId = placeId;
		this.createEditPlaceModalVisible = true;
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
	toggleCreateEditPlaceModal = () => {
		this.createEditPlaceModalVisible = !this.createEditPlaceModalVisible;
	};

	@action
	openCreateEditPlaceModal = () => {
		this.createEditPlaceModalVisible = true;
	};

	@action
	closeCreateEditPlaceModal = () => {
		this.createEditPlaceModalVisible = false;
		this.selectedPlaceId = null;
	};

	@action
	setCurrentPlace = (placeBody) => {
		this.currentPlaceBody = placeBody;
	};

	@action
	uploadMarker = async (placeId, event) => {
		const marker = event.target.files[0];
		const formData = new FormData();
		formData.append('marker', marker);
		await axios.post(`/api/places/${placeId}/marker`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
	};

	@computed
	get selectedPlace() {
		if (this.selectedPlaceId) {
			const { name, description, category, ...rest } = this.places.find(
				(place) => place._id === this.selectedPlaceId,
			);
			return {
				...rest,
				nameTa: name.ta,
				nameEn: name.en,
				descriptionTa: description.ta,
				descriptionEn: description.en,
				category: category.body,
			};
		}

		return null;
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
