import express from 'express';
import requireAuth from './requireAuth';

const router = express.Router();

const requireAdmin = (req, res, next) => {
	if (req.user.roles.includes('admin')) {
		next();
	} else {
		res.send(401);
	}
};

router.use(requireAuth);
router.use(requireAdmin);

export default router;
