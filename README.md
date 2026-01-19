# OIDC Demo Application

A simple full-stack application demonstrating OpenID Connect (OIDC) authentication with Google and GitHub.

## What is OIDC?

**OpenID Connect (OIDC)** is an identity layer built on top of OAuth 2.0. It allows your application to:
- Verify user identity through external providers (Google, GitHub, etc.)
- Get basic profile information (name, email, photo)
- Authenticate users without handling passwords

### How the Flow Works

```
1. User clicks "Sign in with Google"
2. Your app redirects to Google's login page
3. User logs in and grants permission
4. Google redirects back with an authorization code
5. Your backend exchanges the code for tokens
6. User info is extracted and stored in session
7. User is now authenticated!
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing one)
3. Navigate to **APIs & Services > Credentials**
4. Click **Create Credentials > OAuth client ID**
5. Select **Web application**
6. Add authorized redirect URI: `http://localhost:3000/auth/callback/google`
7. Copy the **Client ID** and **Client Secret**

### 3. Create GitHub OAuth Credentials

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click **New OAuth App**
3. Fill in the details:
   - **Application name**: OIDC Demo (or anything you like)
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `http://localhost:3000/auth/callback/github`
4. Click **Register application**
5. Copy the **Client ID**
6. Click **Generate a new client secret** and copy it

### 4. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and fill in your credentials:

```env
SESSION_SECRET=your-random-secret-string
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

### 5. Run the Application

```bash
npm start
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
OIDC/
├── package.json          # Dependencies
├── webpack.config.js     # Webpack configuration
├── .env                  # Your credentials (don't commit!)
├── .env.example          # Template for credentials
├── server/
│   ├── index.js          # Express server entry point
│   ├── auth.js           # Passport.js configuration
│   └── routes.js         # Auth & API routes
└── client/
    ├── public/
    │   └── index.html    # HTML template
    └── src/
        ├── index.js      # React entry point
        ├── App.jsx       # Main component
        └── components/
            ├── Login.jsx   # Login buttons
            └── Profile.jsx # User profile display
```

## Key Concepts Explained

### OAuth 2.0 vs OIDC

- **OAuth 2.0**: Authorization framework - "Can this app access my photos?"
- **OIDC**: Identity layer on OAuth - "Who is this user?"

### Tokens in OIDC

1. **Authorization Code**: Temporary code exchanged for tokens
2. **Access Token**: Used to access protected resources
3. **ID Token**: JWT containing user identity information
4. **Refresh Token**: Used to get new access tokens

### Session-Based Auth (This Demo)

After OIDC authentication:
1. User info is stored in server-side session
2. Session ID is stored in browser cookie
3. Subsequent requests use cookie for authentication

## Troubleshooting

### "redirect_uri_mismatch" Error
- Ensure callback URLs match exactly in Google/GitHub console
- Check for trailing slashes

### "Not found" After Login
- Make sure the server is running
- Check that `.env` file exists and has correct values

### Cannot Connect
- Verify PORT in `.env` matches where you're browsing
- Check no other app is using port 3000
