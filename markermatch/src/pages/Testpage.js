import { Amplify } from 'aws-amplify';

import '@aws-amplify/ui-react/styles.css';

import awsExports from '../aws-exports';
Amplify.configure(awsExports);

function Testpage() {
  return (
    <>
      <h1>If you're reading this, congrats</h1>
    </>
  );
}

export default Testpage;