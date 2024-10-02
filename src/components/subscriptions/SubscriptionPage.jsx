import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { checkSubscriptionStatus, createSession } from '../../services/stripe';
import { Button, Typography, Box, CircularProgress } from '@mui/material';

const priceId = 'price_1Q4QATCkr1BtDqejhjQkZ7YI';

const SubscriptionPage = () => {
  const { user } = useContext(AuthContext);
  const [subscription, setSubscription] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkStatus = async () => {
      if (user) {
        const subscriptionDetails = await checkSubscriptionStatus(user);
        setSubscription(subscriptionDetails);
      }
    };

    checkStatus();
  }, [user]);

  const handleSubscribe = async () => {
    console.log('Subscribe button clicked');
    console.log('User:', user);
    console.log('Price ID:', priceId);
    setIsLoading(true);
    await createSession(user, priceId);
    setIsLoading(false);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4">Subscription Page</Typography>
      {subscription ? (
        <Box>
          <Typography variant="body1">
            You have an active subscription.
          </Typography>
          <Typography variant="body2">
            Subscription ID: {subscription.id}
          </Typography>
          <Typography variant="body2">
            Status: {subscription.status}
          </Typography>
          <Typography variant="body2">
            Current Period Start: {subscription.current_period_start.toLocaleDateString()}
          </Typography>
          <Typography variant="body2">
            Current Period End: {subscription.current_period_end.toLocaleDateString()}
          </Typography>
          <Typography variant="body2">
            Price: {subscription.price.currency.toUpperCase()} {subscription.price.unit_amount / 100} per {subscription.price.interval}
          </Typography>
        </Box>
      ) : (
        <Box sx={{ margin: '10px' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubscribe}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Subscribe Now'}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default SubscriptionPage;