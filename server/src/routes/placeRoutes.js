import { requireAdmin } from '../middlewares';
import { upload } from '../services';
import {
	getAllPlaces,
	createPlace,
	updatePlace,
	deletePlace,
	uploadMarker,
	deleteMarker,
	uploadCover,
	deleteCover,
	uploadImages,
	deleteImage,
} from '../controllers/places';

export default (app) => {
	app.get('/api/places', getAllPlaces);
	app.post('/api/places', requireAdmin, createPlace);
	app.patch('/api/places', requireAdmin, updatePlace);
	app.delete('/api/places/:placeId', requireAdmin, deletePlace);
	app.post('/api/places/:placeId/marker', requireAdmin, upload.single('marker'), uploadMarker);
	app.delete('/api/places/:placeId/marker', requireAdmin, deleteMarker);
	app.post('/api/places/:placeId/cover', requireAdmin, upload.single('cover'), uploadCover);
	app.delete('/api/places/:placeId/cover', requireAdmin, deleteCover);
	app.post('/api/places/:placeId/images', requireAdmin, upload.array('images', 6), uploadImages);
	app.delete('/api/places/:placeId/images/:imageId', requireAdmin, deleteImage);
};
