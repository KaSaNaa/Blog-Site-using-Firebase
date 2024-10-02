import { db } from '../../configs/firebaseConfigs';
import { loadStripe } from '@stripe/stripe-js';
import { collection, addDoc, onSnapshot, query, where, getDocs } from 'firebase/firestore';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const createSession = async (user, priceId) => {
    const docRef = await addDoc(collection(db, 'users', user.uid, 'checkout_sessions'), {
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
    });

    onSnapshot(docRef, async (snap) => {
        const { error, sessionId } = snap.data();

        if (error) {
            alert(`An error occurred: ${error.message}`);
        }

        if (sessionId) {
            const stripe = await stripePromise;
            stripe.redirectToCheckout({ sessionId });
        }
    });
};

const checkSubscriptionStatus = async (user) => {
    const subscriptionsRef = collection(db, 'users', user.uid, 'subscriptions');
    const q = query(subscriptionsRef, where('status', '==', 'active'));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        return null;
    }

    const activeSubscription = querySnapshot.docs[0].data();
    return {
        id: activeSubscription.id,
        status: activeSubscription.status,
        current_period_start: activeSubscription.current_period_start.toDate(),
        current_period_end: activeSubscription.current_period_end.toDate(),
        price: activeSubscription.items[0].price,
    };
};

export { createSession, checkSubscriptionStatus, stripePromise };