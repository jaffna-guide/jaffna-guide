import { requireAuth } from '../middlewares';

import { vote, undoVote } from '../controllers/votes';

export default (app) => {
	app.post('/api/places/:placeId/vote/undo', requireAuth, undoVote);
	app.post('/api/places/:placeId/vote', requireAuth, vote);
};
