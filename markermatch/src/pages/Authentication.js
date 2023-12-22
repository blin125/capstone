//https://ui.docs.amplify.aws/react/guides/auth-protected#adding-in-a-requireauth-component
import { useEffect } from "react";
import { Auth } from 'aws-amplify';
import { Authenticator, useAuthenticator, View } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import { useNavigate, useLocation } from 'react-router';

export function Login() {

  const services = {
    async handleSignUp(formData) {
      let { username, password, attributes } = formData;
      username = username.toLowerCase();
      attributes.email = attributes.email.toLowerCase();
      if (attributes.email.split("@")[1] != "aucklanduni.ac.nz" ) {
        throw new Error("Invalid Email Domain");
      }
      else {
        return await Auth.signUp({
          username,
          password,
          attributes,
          autoSignIn: {
            enabled: true
          }
        });
      }
    },
  };

  const { route } = useAuthenticator((context) => [context.route]);
  const location = useLocation();
  const navigate = useNavigate();
  let from = location.state?.from?.pathname || '/home';
  useEffect(() => {
    if (route === 'authenticated') {
      navigate(from, { replace: true });
    }
  }, [route, navigate, from]);
  return (
    <Authenticator services={services}></Authenticator>
  );
}

export default Login;