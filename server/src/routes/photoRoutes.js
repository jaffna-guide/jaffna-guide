import { requireAuth } from '../middlewares';
import { likePlacePhoto } from '../controllers/photos';

export default (app) => {
  app.post('/api/places/:placeBody/photos/:photoId/like', requireAuth, likePlacePhoto);
};
