import { observable, action, runInAction, computed } from 'mobx';
import axios from 'axios';

class AuthStore {
	@observable authUser = null;
  @observable state = 'pending'; // "pending" / "done" / "error"

	@action
	authenticate = () => {
		this.authUser = null;
		this.state = 'pending';

		const token = localStorage.getItem('token');

		const headers = {};
		if (token) {
			headers['Authorization'] = `Bearer ${token}`;
		} else {
			return (this.state = 'done');
		}

		axios
			.get('/api/auth_user', { headers })
			.then((res) => {
				const authUser = res.data;
				localStorage.setItem('token', authUser.jwt);
				localStorage.setItem('username', authUser.displayName);
				runInAction(() => {
					this.authUser = authUser;
					this.state = 'done';
				});
			})
			.catch((e) => {
				console.log('e', e);
				// localStorage.removeItem('token');
				// runInAction(() => {
				// 	this.authUser = false;
				// 	this.state = 'done';
				// });
			});
	}

	@action
	logout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('username');
		this.state = 'done';
		this.authUser = false;
	}

	@computed
	get isAuthenticated() {
		return this.authUser ? true : false;
	}

	@computed
	get authenticationFailed() {
		return this.authUser === false ? true : false;
	}

	@computed
	get isAdmin() {
		return this.authUser && this.authUser.roles.includes('admin');
	}
}

const store = new AuthStore();

export default store;
