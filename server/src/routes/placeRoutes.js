import { requireAuth } from '../middlewares';
import { getAllPlaces, createPlace } from '../controllers/places';

export default (app) => {
	app.get('/api/places', getAllPlaces);
	app.post('/api/places', requireAuth, createPlace);
};
