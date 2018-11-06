import { observable, action, runInAction, computed } from 'mobx';
import axios from 'axios';

class AuthStore {
	@observable authUser = null;
	@observable state = 'pending'; // "pending" / "done" / "error"

	@action
	authenticate() {
		this.authUser = null;
		this.state = 'pending';

		axios
			.get('/api/auth_user', {
				headers: {
					Authorization:
						'Bearer xeyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1YmQ2ODZmNzliN2EwYTRjYzM1ZGZhM2UiLCJpYXQiOjE1NDE0NzQ1MzIxMDB9.jLwqKfujCsy5tbVa_61vN5hV78oHuxr035s3KpOYnC0',
				},
			})
			.then((res) => {
				const authUser = res.data;
				runInAction(() => {
					this.authUser = authUser;
					this.state = 'done';
				});
			})
			.catch(() => {
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
