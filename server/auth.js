const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

// In-memory user store (no database)
const users = new Map();

// Serialize user to session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser((id, done) => {
  const user = users.get(id);
  done(null, user || null);
});

// GitHub OAuth Strategy
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: '/auth/callback/github'
  }, (accessToken, refreshToken, profile, done) => {
    // Create user object from GitHub profile
    const user = {
      id: `github-${profile.id}`,
      provider: 'github',
      providerId: profile.id,
      displayName: profile.displayName || profile.username,
      email: profile.emails?.[0]?.value,
      photo: profile.photos?.[0]?.value,
      username: profile.username
    };

    // Store in memory
    users.set(user.id, user);
    done(null, user);
  }));
}

module.exports = passport;
