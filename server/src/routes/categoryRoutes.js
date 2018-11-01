import { requireAuth } from '../middlewares';
import { getAllCategories, createCategory } from '../controllers/categories';

export default (app) => {
  app.get('/api/categories', getAllCategories);
  app.post('/api/categories', requireAuth, createCategory);
};
