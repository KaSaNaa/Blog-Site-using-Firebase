import axios from 'axios';

const fetchUserDisplayName = async (uid) => {
  const response = await axios.post(
    import.meta.env.VITE_GET_USER_DISPLAY_NAME,
    { uid }
  );
  return response.data.displayName;
};

export default fetchUserDisplayName;
