import { observable, action, computed, runInAction } from 'mobx';
import axios from 'axios';

class CategoryStore {
	@observable categories = [];
	@observable state = 'pending'; // "pending" / "done" / "error"

	@action
	fetchCategories = async () => {
		this.categories = [];
		this.state = 'pending';

		const res = await axios.get('/api/categories');
		const categories = res.data;
		console.log('categories', categories);
		runInAction(() => {
			this.categories = categories;
			this.state = 'done';
		});
	}

	@action
	addCategory = (category) => {
		this.categories.push(category);
	};

	@computed
	get categoryCount() {
		return this.categories.length;
	}

	@computed
	get placeCategories() {
		return this.categories.filter((category) => category.body !== 'events');
	}
}

const store = new CategoryStore();

export default store;
