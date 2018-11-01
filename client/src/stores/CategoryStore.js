import { observable, action, computed, runInAction } from 'mobx';
import axios from 'axios';

class CategoryStore {
	@observable categories = [];
	@observable state = 'pending'; // "pending" / "done" / "error"

	@action
	fetchCategories() {
		this.categories = [];
		this.state = 'pending';

		axios
			.get('/api/categories')
			.then((res) => {
				const categories = res.data;
				runInAction(() => {
					this.categories = categories;
					this.state = 'done';
				});
			})
			.catch(() => {
				runInAction(() => {
					this.categories = [];
					this.state = 'error';
				});
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
}

const store = new CategoryStore();

export default store;
