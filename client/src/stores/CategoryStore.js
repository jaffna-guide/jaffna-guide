import { observable, action, computed } from 'mobx';
import axios from 'axios'

class CategoryStore {
  @observable categories = [];
  @observable state = 'pending'; // "pending" / "done" / "error"

  @action
  fetchCategories() {
    axios.get('/api/categories').then(categories => {
      console.log('categories', categories);
    })
    this.categories = [];
    this.state = 'pending';
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
