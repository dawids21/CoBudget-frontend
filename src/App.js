import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { Security } from "@okta/okta-react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AppRoutes from "./components/Routes/AppRoutes";
import AppBar from "./components/UI/AppBar/AppBar";
import auth from "./config/auth";

const oktaAuth = new OktaAuth(auth);

const App = () => {
  const navigate = useNavigate();

  const restoreOriginalUri = useCallback((_oktaAuth, originalUri) => {
    navigate(toRelativeUrl(originalUri || "/", window.location.origin));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <header>
        <AppBar />
      </header>
      <main>
        <AppRoutes />
      </main>
    </Security>
  );
};

export default App;
