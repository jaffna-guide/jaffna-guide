import { requireAdmin } from '../middlewares';
import { getAllPlaces, createPlace, updatePlace } from '../controllers/places';

export default (app) => {
	app.get('/api/places', getAllPlaces);
	app.post('/api/places', requireAdmin, createPlace);
	app.patch('/api/places', requireAdmin, updatePlace);
};
