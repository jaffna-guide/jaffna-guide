import { requireAdmin, requireAuth } from '../middlewares';
import { upload } from '../services';
import { getAllPlaces, createPlace, updatePlace, deletePlace, uploadMarker } from '../controllers/places';

export default (app) => {
	app.get('/api/places', getAllPlaces);
	app.post('/api/places', requireAdmin, createPlace);
	app.patch('/api/places', requireAdmin, updatePlace);
	app.delete('/api/places/:placeId', requireAdmin, deletePlace);
	app.post('/api/places/:placeId/marker', requireAdmin, upload.single('marker'), uploadMarker);
};
