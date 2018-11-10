import R from 'ramda';
import requireAuth from './requireAuth';

const requireAdmin = (req, res, next) => {
	console.log('req.user', req.user);
	next();
};

export default requireAuth;
