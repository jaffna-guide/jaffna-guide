import { requireAdmin, requireAuth } from '../middlewares';
import { upload } from '../services';
import {
	getPlaces,
	getPlacesWithPhotos,
	createPlace,
	updatePlace,
	deletePlace,
	uploadMarker,
	deleteMarker,
	uploadCover,
	deleteCover,
	uploadLogo,
	deleteLogo,
	uploadPlacePhotos,
	deletePlacePhoto,
} from '../controllers/places';

export default (app) => {
	app.get('/api/places', getPlaces);
	app.get('/api/places-with-photos', getPlacesWithPhotos);
	app.post('/api/places', requireAdmin, createPlace);
	app.patch('/api/places', requireAdmin, updatePlace);
	app.delete('/api/places/:placeId', requireAdmin, deletePlace);
	app.post('/api/places/:placeId/marker', requireAdmin, upload.single('marker'), uploadMarker);
	app.delete('/api/places/:placeId/marker', requireAdmin, deleteMarker);
	app.post('/api/places/:placeId/cover', requireAdmin, upload.single('cover'), uploadCover);
	app.delete('/api/places/:placeId/cover', requireAdmin, deleteCover);
	app.post('/api/places/:placeId/logo', requireAdmin, upload.single('logo'), uploadLogo);
	app.delete('/api/places/:placeId/logo', requireAdmin, deleteLogo);
	app.post('/api/places/:placeId/photos', requireAuth, upload.array('photos', 6), uploadPlacePhotos);
	app.delete('/api/places/:placeId/photos/:photoId', requireAdmin, deletePlacePhoto);
};
