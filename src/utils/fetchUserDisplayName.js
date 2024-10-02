import axios from 'axios';

const fetchUserDisplayName = async (uid) => {
  try {
    const response = await axios.post(
      import.meta.env.VITE_GET_USER_DISPLAY_NAME,
      { uid }
    );
    return response.data.displayName || 'Unknown User';
  } catch (error) {
    console.error('Error fetching user display name:', error);
    return 'This account has been deleted';
  }
};

export default fetchUserDisplayName;
