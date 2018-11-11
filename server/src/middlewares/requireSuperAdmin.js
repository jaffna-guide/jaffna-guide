import express from 'express';
import requireAuth from './requireAuth';

const router = express.Router();

const requireSuperAdmin = (req, res, next) => {
  if (req.user.roles.includes('superadmin')) {
    next();
  } else {
    res.send(401);
  }
};

router.use(requireAuth);
router.use(requireSuperAdmin);

export default router;