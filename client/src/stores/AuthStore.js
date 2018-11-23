import { observable, action, computed, runInAction } from 'mobx';
import axios from 'axios';
import localStorage from 'mobx-localstorage';

class AuthStore {
	@observable authUser = null;
	@observable state = 'pending'; // "pending" / "done" / "error"
	@observable hasCastedVoteForCurrentPlace = null;
	@observable currentPlaceVotes = null;

	@action
	authenticate = async (currentPlaceBody) => {
		this.authUser = null;
		this.state = 'pending';

		const token = localStorage.getItem('token');

		const headers = {};
		if (token) {
			headers['Authorization'] = `Bearer ${token}`;
		} else {
			return (this.state = 'done');
		}

		const res = await axios.get('/api/auth_user', { headers });
		const authUser = res.data;
		localStorage.setItem('token', authUser.jwt);
		localStorage.setItem('username', authUser.displayName);
		runInAction(() => {
			this.authUser = authUser;
		});

		if (currentPlaceBody) {
			const res = await axios.get(`/api/votes/latest`, {
				params: { placeBody: currentPlaceBody, userId: authUser._id },
			});
			const vote = res.data && res.data[0];
			if (vote) {
				runInAction(() => {
					this.hasCastedVoteForCurrentPlace = true;
					this.currentPlaceVotes = vote.votes;
					this.state = 'done';
				});
			} else {
				runInAction(() => {
					this.hasCastedVoteForCurrentPlace = false;
					this.currentPlaceVotes = undefined;
					this.state = 'done';
				});
			}
		} else {
			runInAction(() => {
				this.state = 'done';
			});
		}
	};

	@action
	logout = () => {
		localStorage.delete('token');
		localStorage.delete('username');
		this.state = 'done';
		this.authUser = false;
		this.hasCastedVoteForCurrentPlace = null;
		this.currentPlaceVotes = null;
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
