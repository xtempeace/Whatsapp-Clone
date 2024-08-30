
import './App.css';
import Messenger from './components/Messenger.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AccountProvider from './context/AccountProvider.jsx';

function App() {

  const clientId = '13292640327-q54ehdgn4qncc75neegf2g61gpm480qa.apps.googleusercontent.com';
  
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AccountProvider>
        <Messenger />
      </AccountProvider>
    </GoogleOAuthProvider>
    
    
  );
}

export default App;
