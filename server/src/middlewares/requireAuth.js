import passport from 'passport';

export default passport.authenticate('jwt', { session: false });

// requireAuth will only guarantee that a user model is attached to req.user.
// We might need more consise middleware to check certain properties on the user model,
// before we allow certain actions.
