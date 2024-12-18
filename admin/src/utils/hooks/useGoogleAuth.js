import { useState, useEffect } from 'react';
import { gapi } from 'gapi-script';

const useGoogleAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    function initClient() {
      gapi.client.init({
        apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        discoveryDocs: [process.env.REACT_APP_GOOGLE_DISCOVERY_DOCS],
        scope: process.env.REACT_APP_GOOGLE_SCOPE,
      }).then(() => {
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      });
    }

    gapi.load('client:auth2', initClient);
  }, []);

  const updateSigninStatus = (isSignedIn) => {
    setIsAuthenticated(isSignedIn);
  };

  const handleSignIn = () => {
    gapi.auth2.getAuthInstance().signIn();
  };

  const handleSignOut = () => {
    gapi.auth2.getAuthInstance().signOut();
  };

  return {
    isAuthenticated,
    handleSignIn,
    handleSignOut,
  };
};

export default useGoogleAuth;
