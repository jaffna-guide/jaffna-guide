import { requireAuth } from '../middlewares';

import { vote, undoVote, getLatestVote, getLatestVotes } from '../controllers/votes';

export default (app) => {
	app.post('/api/places/:placeBody/vote/undo', requireAuth, undoVote);
	app.post('/api/places/:placeBody/vote', requireAuth, vote);
	app.get('/api/votes/latest', requireAuth, getLatestVotes);
};
