const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const express = require('express');
const session = require('express-session');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const passport = require('./auth');
const routes = require('./routes');
const webpackConfig = require('../webpack.config');

const app = express();
const PORT = process.env.PORT || 3000;

// Session configuration (in-memory store)
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to true if using HTTPS
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Webpack dev middleware for serving React app
const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath
}));

// API and auth routes
app.use(routes);

// Serve static files
app.use(express.static(path.join(__dirname, '../client/public')));

// Fallback to index.html for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

app.listen(PORT, () => {
  console.log(`
====================================
  OIDC Demo Server Running
====================================

  URL: http://localhost:${PORT}

  GitHub OAuth: ${process.env.GITHUB_CLIENT_ID ? 'Configured' : 'Not configured (missing GITHUB_CLIENT_ID)'}

  Make sure to set up your .env file!
====================================
`);
});
