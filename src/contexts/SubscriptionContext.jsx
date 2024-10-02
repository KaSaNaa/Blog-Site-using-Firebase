import { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { checkSubscriptionStatus } from '../services/stripe';

const SubscriptionContext = createContext();

// eslint-disable-next-line react/prop-types
const SubscriptionProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      if (user) {
        const subscriptionDetails = await checkSubscriptionStatus(user);
        setSubscription(subscriptionDetails);
      }
      setLoading(false);
    };

    fetchSubscriptionStatus();
  }, [user]);

  return (
    <SubscriptionContext.Provider value={{ subscription, loading }}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export { SubscriptionContext, SubscriptionProvider };