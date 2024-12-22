import { useState, useEffect } from 'react';
import { gapi } from 'gapi-script';
import { toast } from 'react-toastify';

const useGoogleAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
 // const [userEmail, setUserEmail] = useState(null);
  const authorizedEmail = process.env.REACT_APP_GOOGLE_ADMIN_LOGIN;

  useEffect(() => {
    function initClient() {
      gapi.client.init({
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        discoveryDocs: [process.env.REACT_APP_GOOGLE_DISCOVERY_DOCS],
        scope: process.env.REACT_APP_GOOGLE_SCOPE,
      }).then(() => {
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      })
    }

    gapi.load('client:auth2', initClient);
  }, []);

  const updateSigninStatus = (isSignedIn) => {
    if (isSignedIn) {
      const profile = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile();
      const email = profile.getEmail();
    
      if (email === authorizedEmail) {
        setIsAuthenticated(true);
        //setUserEmail(email);
        toast.success("Signed in successfully.");
      } else {
        toast.error("Unauthorized email address. Access denied.");
        handleSignOut(false); // Sign out the unauthorized user
      }
    } else {
      setIsAuthenticated(false);
      //setUserEmail(null);
      
    }
  };

  const handleSignIn = () => {
    gapi.auth2.getAuthInstance().signIn()
      .then(() => {
        toast.info("Signing in...");
      })
    
  };

  const handleSignOut = (showtoast=true) => {
    gapi.auth2.getAuthInstance().signOut()
      .then(() => {
        if(showtoast)
        toast.success("Signed out successfully.");
      })
      .catch((error) => {
        toast.error("Error signing out.");
      });
  };

  return {
    isAuthenticated,
    handleSignIn,
    handleSignOut,
  };
};

export default useGoogleAuth;
