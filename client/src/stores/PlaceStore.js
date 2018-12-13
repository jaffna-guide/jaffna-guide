import { observable, action, computed, runInAction } from 'mobx';
import axios from 'axios';

class PlaceStore {
	@observable places = [];
	@observable state = 'pending'; // "pendingX" / "done" / "error"
	@observable selectedPlaceId = null;
	@observable hoveredPlaceId = null;
	@observable currentPlaceBody = '';
	@observable createEditPlaceModalVisible = false;
	@observable shallMarkerAnimate = true;
	@observable tapedTwice = false;

	@action
	fetchPlaces = async () => {
		this.places = [];
		this.state = 'pendingFetchPlaces';

		const res = await axios.get('/api/places');
		const places = res.data;
		runInAction(() => {
			this.places = places;
			this.state = 'done';
		});
	};

	@action
	createPlace = async (place) => {
		this.state = 'pendingCreatePlace';
		const res = await axios.post('/api/places', place);
		const createdPlace = res.data;
		runInAction(() => {
			this.createEditPlaceModalVisible = false;
			this.places.push(createdPlace);
			this.state = 'done';
		});
	};

	@action
	editPlace = async (place) => {
		this.state = 'pendingEditPlace';
		const res = await axios.patch('/api/places', place);
		const editedPlace = res.data;
		const index = this.places.findIndex((p) => p._id === place.id);

		runInAction(() => {
			this.places.splice(index, 1, editedPlace);
			this.createEditPlaceModalVisible = false;
			this.selectedPlaceId = null;
			this.state = 'done';
		});
	};

	@action
	deletePlace = async (placeId) => {
		this.state = 'pendingDeletePlace';
		const res = await axios.delete(`/api/places/${placeId}`);
		if (res.status === 200) {
			const index = this.places.map((p) => p.id).indexOf(placeId);
			runInAction(() => {
				this.places.splice(index, 1);
				this.state = 'done';
			});
		}
	};

	@action
	selectPlace = (placeId) => {
		this.shallMarkerAnimate = true;
		this.selectedPlaceId = placeId;
		this.hoveredPlaceId = placeId;
		this.createEditPlaceModalVisible = true;

		setTimeout(() => {
			this.shallMarkerAnimate = false;
		}, 500);
	};

	@action
	hoverPlace = (placeId) => {
		this.hoveredPlaceId = placeId;
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
	uploadMarker = async (placeId, markerType, event) => {
		this.state = `pendingUploadMarker${markerType.charAt(0).toUpperCase()}${markerType.substr(1)}`;
		const marker = event.target.files[0];
		const formData = new FormData();
		formData.append('marker', marker);
		formData.set('markerType', markerType);
		const res = await axios.post(`/api/places/${placeId}/marker`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		const updatedMarker = res.data;
		const placeToBeUpdated = this.places.find((p) => p._id === placeId);
		runInAction(() => {
			placeToBeUpdated.marker = updatedMarker;
			this.state = 'done';
		});
	};

	@action
	deleteMarker = async (placeId, markerType) => {
		this.state = `pendingDeleteMarker${markerType.charAt(0).toUpperCase()}${markerType.substr(1)}`;
		const res = await axios.delete(`/api/places/${placeId}/marker`, { data: { markerType } });
		const updatedMarker = res.data;
		const placeToBeUpdated = this.places.find((p) => p._id === placeId);
		runInAction(() => {
			placeToBeUpdated.marker = updatedMarker;
			this.state = 'done';
		});
	};

	@action
	uploadCover = async (placeId, event) => {
		this.state = 'pendingUploadCover';
		const cover = event.target.files[0];
		const formData = new FormData();
		formData.append('cover', cover);
		const res = await axios.post(`/api/places/${placeId}/cover`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		const updatedCover = res.data;
		const placeToBeUpdated = this.places.find((p) => p._id === placeId);
		runInAction(() => {
			placeToBeUpdated.cover = updatedCover;
			this.state = 'done';
		});
	};

	@action
	deleteCover = async (placeId) => {
		this.state = 'pendingDeleteCover';
		await axios.delete(`/api/places/${placeId}/cover`);
		const placeToBeUpdated = this.places.find((p) => p._id === placeId);
		runInAction(() => {
			placeToBeUpdated.cover = undefined;
			this.state = 'done';
		});
	};

	@action
	uploadLogo = async (placeId, event) => {
		this.state = 'pendingUploadLogo';
		const logo = event.target.files[0];
		const formData = new FormData();
		formData.append('logo', logo);
		const res = await axios.post(`/api/places/${placeId}/logo`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		const updatedLogo = res.data;
		const placeToBeUpdated = this.places.find((p) => p._id === placeId);
		runInAction(() => {
			placeToBeUpdated.logo = updatedLogo;
			this.state = 'done';
		});
	};

	@action
	deleteLogo = async (placeId) => {
		this.state = 'pendingDeleteLogo';
		await axios.delete(`/api/places/${placeId}/logo`);
		const placeToBeUpdated = this.places.find((p) => p._id === placeId);
		runInAction(() => {
			placeToBeUpdated.logo = undefined;
			this.state = 'done';
		});
	};

	@action
	uploadImages = async (placeId, files) => {
		this.state = 'pendingUploadImages';
		const formData = new FormData();
		files.forEach((image) => {
			formData.append('images', image);
		});
		try {
			const res = await axios.post(`/api/places/${placeId}/images`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});

			const placeToBeUpdated = this.places.find((p) => p._id === placeId);
			const updatedImages = res.data;

			runInAction(() => {
				placeToBeUpdated.images = updatedImages;
				this.state = 'done';
			});
		} catch (e) {
			runInAction(() => {
				this.state = 'errorFileTooLarge';
			});
		}
	};

	@action
	deleteImage = async (placeId, imageId) => {
		this.state = 'pendingDeleteImage';
		const res = await axios.delete(`/api/places/${placeId}/images/${imageId}`);
		const updatedImages = res.data;
		const placeToBeUpdated = this.places.find((p) => p._id === placeId);

		runInAction(() => {
			placeToBeUpdated.images = updatedImages;
			this.state = 'done';
		});
	};

	@action
	setTapedTwice = (tapValue) => {
		this.tapedTwice = tapValue;
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
	get activePlaces() {
		return this.places.find((place) => place.active === true);
	}

	@computed
	get mentionSuggestions() {
		return this.places.map(p => ({ name: p.name.en, link: `/${p.body}`, avatar: p.cover }));
	}

	@computed
	get currentPlace() {
		return this.places.find((place) => place.body === this.currentPlaceBody);
	}

	@computed
	get restaurants() {
		return this.places
			.filter((place) => place.active === true && place.category.body === 'restaurants')
			.sort((a, b) => b.score - a.score);
	}

	@computed
	get hotels() {
		return this.places
			.filter((place) => place.active === true && place.category.body === 'hotels')
			.sort((a, b) => b.score - a.score);
	}

	@computed
	get events() {
		return this.events.filter((event) => event.active === true && event.category.body === 'events');
	}

	@computed
	get culture() {
		return this.places
			.filter((place) => place.active === true && place.category.body === 'culture')
			.sort((a, b) => b.score - a.score);
	}

	@computed
	get education() {
		return this.places
			.filter((place) => place.active === true && place.category.body === 'education')
			.sort((a, b) => b.score - a.score);
	}
}

const store = new PlaceStore();

export default store;
