import { observable, action, runInAction, computed } from 'mobx';
import axios from 'axios';

class AuthStore {
	@observable authUser = null;
	@observable state = 'pending'; // "pending" / "done" / "error"

	@action
	authenticate() {
		this.authUser = null;
		this.state = 'pending';

		const token = localStorage.getItem('token');
		console.log('token', token);

		const headers = {};
		if (token) {
			headers['Authorization'] = token;
		}

		axios
			.get('/api/auth_user', { headers })
			.then((res) => {
				const authUser = res.data;
				console.log('authUser', authUser);
				localStorage.setItem('token', authUser.jwt);
				runInAction(() => {
					this.authUser = authUser;
					this.state = 'done';
				});
			})
			.catch(() => {
				console.log('user was not able to authenticate');
				localStorage.removeItem('token');
				runInAction(() => {
					this.authUser = false;
					this.state = 'done';
				});
			});
	}

	@action
	logout() {
		this.state = 'done';
		this.authUser = false;
	}

	@computed
	get isAuthenticated() {
		return this.authUser ? true : false;
	}

	@computed
	get isAdmin() {
		return this.authUser && this.authUser.roles.includes('admin');
	}
}

const store = new AuthStore();

export default store;
