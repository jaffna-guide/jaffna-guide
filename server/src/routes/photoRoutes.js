import { requireAuth } from '../middlewares';
import { togglePhotoLove } from '../controllers/photos';

export default (app) => {
  app.post('/api/photos/:photoId/love', requireAuth, togglePhotoLove);
};
