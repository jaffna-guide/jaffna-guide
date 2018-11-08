import { observable, action } from 'mobx';

class LanguageStore {
  @observable lang = 'en'; // 'en', 'ta', 'de'

  @action
  setLanguage = (lang) => {
    this.lang = lang;
  };
}

const store = new LanguageStore();

export default store;
