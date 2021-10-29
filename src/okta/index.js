import OktaSignIn from '@okta/okta-signin-widget'
import {OktaAuth} from '@okta/okta-auth-js'

const yourOktaUri = 'https://dev-01647397.okta.com'
// noinspection SpellCheckingInspection
const clientId = '0oa24pfnd1D6oI3Ak5d7'

const oktaSignIn = new OktaSignIn({
    baseUrl: yourOktaUri,
    clientId: clientId,
    redirectUri: 'http://localhost:8081/login/callback',
    authParams: {
        pkce: true,
        issuer: `${yourOktaUri}/oauth2/default`,
        display: 'page',
        scopes: ['openid', 'profile', 'email'],
    },
})

const oktaAuth = new OktaAuth({
    issuer: `${yourOktaUri}/oauth2/default`,
    clientId: clientId,
    redirectUri: window.location.origin + '/login/callback',
    scopes: ['openid', 'profile', 'email'],
})

export {oktaAuth, oktaSignIn}