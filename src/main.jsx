import { createRoot } from 'react-dom/client';
import { AuthProvider } from './contexts/AuthContext';
import AppWrapper from './App';
import { SubscriptionProvider } from './contexts/SubscriptionContext';

createRoot(document.getElementById('root')).render(
  
    <AuthProvider>
      <SubscriptionProvider>
        <AppWrapper />
      </SubscriptionProvider>
    </AuthProvider>
);
