import { requireAuth, requireAdmin } from '../middlewares';
import { getAllPlaces, createPlace, updatePlace } from '../controllers/places';

export default (app) => {
	app.get('/api/places', getAllPlaces);
	app.post('/api/places', requireAuth, createPlace);
	app.patch('/api/places', requireAuth, updatePlace);
};
