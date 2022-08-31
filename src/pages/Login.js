import React, { useEffect, useRef } from "react";
import "@okta/okta-signin-widget/dist/css/okta-sign-in.min.css";
import OktaSignIn from "@okta/okta-signin-widget";
import auth from "../config/auth";
import { useOktaAuth } from "@okta/okta-react";

const Login = () => {
  const { oktaAuth } = useOktaAuth();
  const widgetRef = useRef();

  const { issuer, clientId, redirectUri } = auth;

  useEffect(() => {
    if (!widgetRef.current) {
      return;
    }

    const signInWidget = new OktaSignIn({
      issuer,
      clientId,
      redirectUri,
    });

    signInWidget.renderEl(
      { el: widgetRef.current },
      (res) => {
        oktaAuth.handleLoginRedirect(res.tokens);
      },
      (err) => {
        throw err;
      }
    );

    return () => signInWidget.remove();
  }, [oktaAuth, issuer, clientId, redirectUri]);

  return (
    <>
      <div ref={widgetRef} />
    </>
  );
};

export default Login;
