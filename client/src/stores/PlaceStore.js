import { observable, action, computed } from 'mobx';

class PlaceStore {
  @observable places = [];

  @action addPlace = (place) => {
    this.places.push(place);
  }

  @computed get placeCount() {
    return this.places.length;
  }
}

const store = new PlaceStore();

export default store;
