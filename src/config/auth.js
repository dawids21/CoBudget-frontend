const CLIENT_ID = process.env.REACT_APP_OKTA_CLIENT_ID;
const ISSUER = process.env.REACT_APP_OKTA_ISSUER;
const BASENAME = process.env.PUBLIC_URL || "";
const REDIRECT_URI = `${window.location.origin}${BASENAME}/login/callback`;

const auth = {
  clientId: CLIENT_ID,
  issuer: ISSUER,
  redirectUri: REDIRECT_URI,
  scopes: ["openid", "profile", "email", "offline_access"],
  pkce: true,
};

export default auth;
