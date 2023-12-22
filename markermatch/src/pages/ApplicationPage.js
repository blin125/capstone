import NavbarComp from '../components/NavbarComp';
import Sidebar from '../components/Sidebar';
import React from 'react';
import MarkerApplicationForm from '../components/MarkerApplicationForm';
import { useAuthenticator } from '@aws-amplify/ui-react';

function ApplicationPage() {
  return (
    <div>
      <MarkerApplicationForm />
    </div>
  );
}

export default ApplicationPage;