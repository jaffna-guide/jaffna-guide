import { observable, action, computed } from 'mobx';
import axios from 'axios';
import localStorage from 'mobx-localstorage';

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
				this.authUser = authUser;
				this.state = 'done';
			})
			.catch((e) => {
				console.log('e', e);
				// localStorage.removeItem('token');
				// runInAction(() => {
				// 	this.authUser = false;
				// 	this.state = 'done';
				// });
			});
	};

	@action
	logout = () => {
		console.log('Logging out...');
		localStorage.delete('token');
		localStorage.delete('username');
		this.state = 'done';
		this.authUser = false;
	};

	@computed
	get username() {
		return localStorage.getItem('username') || (this.authUser && this.authUser.displayName);
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
