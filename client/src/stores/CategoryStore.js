import { observable, action, computed } from 'mobx';

class CategoryStore {
  @observable categories = [];
  @observable state = 'pending'; // "pending" / "done" / "error"

  @action
  fetchCategories() {
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
