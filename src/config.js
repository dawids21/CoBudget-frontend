const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const ISSUER = process.env.REACT_APP_ISSUER;
const BASENAME = process.env.PUBLIC_URL || "";
const REDIRECT_URI = `${window.location.origin}${BASENAME}/login/callback`;

const config = {
  oidc: {
    clientId: CLIENT_ID,
    issuer: ISSUER,
    redirectUri: REDIRECT_URI,
    scopes: ["openid", "profile", "email"],
    pkce: true,
  },
};

export default config;
