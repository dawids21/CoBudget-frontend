import OktaSignIn from '@okta/okta-signin-widget'
import {OktaAuth} from '@okta/okta-auth-js'

const yourOktaUri = process.env.VUE_APP_OKTA_URI
const clientId = process.env.VUE_APP_OKTA_CLIENT_ID

const oktaSignIn = new OktaSignIn({
    baseUrl: yourOktaUri,
    clientId: clientId,
    redirectUri: process.env.VUE_APP_OKTA_REDIRECT_URI,
    authParams: {
        pkce: true,
        issuer: `${yourOktaUri}/oauth2/default`,
        display: 'page',
        scopes: ['openid', 'profile', 'email'],
    },
    features: {
        registration: true,
    },
})

const oktaAuth = new OktaAuth({
    issuer: `${yourOktaUri}/oauth2/default`,
    clientId: clientId,
    redirectUri: window.location.origin + '/login/callback',
    scopes: ['openid', 'profile', 'email'],
})

export {oktaAuth, oktaSignIn}