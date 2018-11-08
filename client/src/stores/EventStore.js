import { observable, action, computed, runInAction } from 'mobx';
import axios from 'axios';

class EventStore {
	@observable events = [];
	@observable state = 'pending'; // "pending" / "done" / "error"

	@action
	fetchEvents() {
		this.events = [];
		this.state = 'pending';

		axios
			.get('/api/events')
			.then((res) => {
				const events = res.data;
				runInAction(() => {
					this.events = events;
					this.state = 'done';
				});
			})
			.catch(() => {
				runInAction(() => {
					this.events = [];
					this.state = 'error';
				});
			});
	}

	@action
	addEvent = (event) => {
		this.events.push(event);
	};

	@computed
	get eventCount() {
		return this.events.length;
	}
}

const store = new EventStore();

export default store;
