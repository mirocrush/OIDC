const express = require('express');
const passport = require('passport');

const router = express.Router();

// GitHub OAuth routes
router.get('/auth/github', passport.authenticate('github', {
  scope: ['user:email']
}));

router.get('/auth/callback/github', passport.authenticate('github', {
  failureRedirect: '/?error=github_auth_failed'
}), (req, res) => {
  // Successful authentication
  res.redirect('/');
});

// Logout route
router.get('/auth/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
});

// Get current user
router.get('/api/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      authenticated: true,
      user: req.user
    });
  } else {
    res.json({
      authenticated: false,
      user: null
    });
  }
});

module.exports = router;
