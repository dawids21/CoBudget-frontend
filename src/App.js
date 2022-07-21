import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { Security } from "@okta/okta-react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AppRoutes from "./components/Routes/AppRoutes";
import config from "./config";

const oktaAuth = new OktaAuth(config.oidc);

const App = () => {
  const navigate = useNavigate();

  const restoreOriginalUri = useCallback((_oktaAuth, originalUri) => {
    navigate(toRelativeUrl(originalUri || "/", window.location.origin));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <main>
        <AppRoutes />
      </main>
    </Security>
  );
};

export default App;
