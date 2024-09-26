import { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../configs/firebaseConfigs';
import { doc, updateDoc, arrayUnion, increment } from 'firebase/firestore';
import { Box } from '@mui/material';
import { AuthContext } from '../../contexts/AuthContext';
import Spinner from '../misc/Spinner';
import useArticle from '../../hooks/useArticle';
import ArticleContent from './ArticleView/ArticleContent';
import ArticleComments from './ArticleView/ArticleComments';
import CommentForm from './ArticleView/CommentForm';

/**
 * ArticleView component fetches and displays an article along with its comments and like functionality.
 * 
 * @component
 * @returns {JSX.Element} The rendered component.
 * 
 * @example
 * return (
 *   <ArticleView />
 * )
 * 
 * @description
 * This component uses the `useParams` hook to get the article ID from the URL, and the `useArticle` custom hook to fetch the article data.
 * It also allows users to add comments and like the article. The component uses the `AuthContext` to get the current user information.
 * 
 * @function handleAddComment
 * Adds a new comment to the article. It checks if the comment is not empty, creates a new comment object, updates the Firestore document, and refreshes the article view.
 * 
 * @function handleLike
 * Adds a like to the article. It checks if the user has already liked the article, updates the Firestore document, and refreshes the article view.
 * 
 * @requires useParams
 * @requires useArticle
 * @requires useState
 * @requires useContext
 * @requires AuthContext
 * @requires Spinner
 * @requires Box
 * @requires ArticleContent
 * @requires ArticleComments
 * @requires CommentForm
 * @requires doc
 * @requires updateDoc
 * @requires arrayUnion
 * @requires increment
 */
const ArticleView = () => {
  const { articleId } = useParams();
  const { article, fetchArticle } = useArticle(articleId);
  const [comment, setComment] = useState('');
  const { user } = useContext(AuthContext);

  const handleAddComment = async () => {
    if (!comment.trim()) return;

    const newComment = {
      uid: user.uid,
      comment,
      date: new Date(),
    };

    const docRef = doc(db, 'articles', articleId);
    await updateDoc(docRef, {
      comments: arrayUnion(newComment),
    });

    setComment('');
    fetchArticle(); // Refresh the view
  };

  const handleLike = async () => {
    if (article.likedBy.includes(user.uid)) {
      return; // User has already liked the article
    }

    const docRef = doc(db, 'articles', articleId);
    await updateDoc(docRef, {
      likeCount: increment(1),
      likedBy: arrayUnion(user.uid),
    });

    fetchArticle(); // Refresh the view
  };

  if (!article) {
    return <Spinner text="Fetching article from the cloud..." />;
  }

  return (
    <Box sx={{ maxWidth: 800, margin: '0 auto', padding: 2 }}>
      <ArticleContent article={article} handleLike={handleLike} />
      <ArticleComments comments={article.comments} />
      <CommentForm
        comment={comment}
        setComment={setComment}
        handleAddComment={handleAddComment}
      />
    </Box>
  );
};

export default ArticleView;
