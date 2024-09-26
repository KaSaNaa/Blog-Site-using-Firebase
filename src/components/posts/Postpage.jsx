import { useState, useContext } from 'react';
import {
  Container,
  Button,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Snackbar,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { addPost } from '../../services/posts';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../configs/firebaseConfigs';
import ArticlePost from './ArticlePost';
import QuestionPost from './QuestionPost';
import Spinner from '../misc/Spinner';

/**
 * PostPage component handles the creation and submission of posts.
 * It allows users to select between posting a question or an article.
 * 
 * @component
 * 
 * @example
 * return (
 *   <PostPage />
 * )
 * 
 * @returns {JSX.Element} The rendered component.
 * 
 * @description
 * - Uses `useState` to manage local state for post type, loading status, and snackbar notifications.
 * - Uses `useNavigate` from `react-router-dom` for navigation.
 * - Uses `useContext` to access the authenticated user from `AuthContext`.
 * - Contains `handlePostSubmit` function to handle post submission, including validation, image upload, and post creation.
 * - Displays a loading spinner and snackbar notifications based on the state.
 * - Renders `PostTypeSelector`, `QuestionPost`, and `ArticlePost` components based on the selected post type.
 * 
 * @function handlePostSubmit
 * @param {Object} postData - The data of the post to be submitted.
 * @param {string} postData.title - The title of the post.
 * @param {string} postData.description - The description of the post.
 * @param {Array<string>} postData.tags - The tags associated with the post.
 * @param {File} [postData.image] - The image file to be uploaded with the post.
 * 
 * @returns {Promise<void>} A promise that resolves when the post is successfully submitted.
 * 
 * @throws Will throw an error if the user is not authenticated or if there is an error during post submission.
 */
const PostPage = () => {
  const [postType, setPostType] = useState('question');
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const navFindQuestions = () => {
    navigate('/find-questions');
  };

  const navShowArticles = () => {
    navigate('/show-articles');
  };

  {
    /* -------------------------------- HANDLE POST SUBMIT FUNCTION STARTS HERE -------------------------------- */
  }
  const handlePostSubmit = async (postData) => {
    if (!user) {
      console.error('User not authenticated');
      return;
    }

    if (!postData.title || !postData.description || !postData.tags) {
      setSnackbarMessage('All fields are required.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    setLoading(true);

    try {
      let imageUrl = null;
      if (postData.image) {
        const imageRef = ref(
          storage,
          `images/posts/articles/${postData.image.name}`
        );
        const snapshot = await uploadBytes(imageRef, postData.image);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      const postWithImageUrl = { ...postData, image: imageUrl };
      await addPost(postType, postWithImageUrl, user.uid);
      setLoading(false);
      setSnackbarMessage('Post submitted successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

      if (postType === 'question') {
        navFindQuestions();
      } else {
        navShowArticles();
      }

      console.log(`${postType} posted successfully!`);
    } catch (error) {
      console.error(`Error posting ${postType}: `, error);
      setLoading(false);
      setSnackbarMessage('Error submitting post.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };
  {
    /* -------------------------------- HANDLE POST SUBMIT FUNCTION ENDS HERE -------------------------------- */
  }
  return (
    <Container>
      {loading && <Spinner color="#4fa94d" text="Submitting Post..." />}
      <div style={{ filter: loading ? 'blur(5px)' : 'none' }}>
        <Box my={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={navFindQuestions}
          >
            Find Questions
          </Button>
        </Box>
        <PostTypeSelector postType={postType} setPostType={setPostType} />
        {postType === 'question' ? (
          <QuestionPost onSubmit={handlePostSubmit} />
        ) : (
          <ArticlePost onSubmit={handlePostSubmit} />
        )}
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

// eslint-disable-next-line react/prop-types
const PostTypeSelector = ({ postType, setPostType }) => {
  const handlePostTypeChange = (_event, newPostType) => {
    if (newPostType !== null) {
      console.log('Post type changed to:', newPostType); // Debugging statement
      setPostType(newPostType);
    }
  };

  return (
    <Box my={2}>
      <ToggleButtonGroup
        value={postType}
        exclusive
        onChange={handlePostTypeChange}
        aria-label="post type"
      >
        <ToggleButton value="question" aria-label="question">
          Question
        </ToggleButton>
        <ToggleButton value="article" aria-label="article">
          Article
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default PostPage;
