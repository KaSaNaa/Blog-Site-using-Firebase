import { useState, useEffect } from 'react';
import { db } from '../configs/firebaseConfigs';
import { doc, getDoc } from 'firebase/firestore';
import fetchUserDisplayName from '../utils/fetchUserDisplayName'; // Import the utility function

/**
 * Custom hook to fetch and manage an article by its ID.
 *
 * @param {string} articleId - The ID of the article to fetch.
 * @returns {Object} - An object containing the article data and a function to refetch the article.
 * @returns {Object|null} article - The fetched article data, or null if not yet fetched.
 * @returns {Function} fetchArticle - Function to refetch the article data.
 */
const useArticle = (articleId) => {
  const [article, setArticle] = useState(null);

  const fetchArticle = async () => {
    const docRef = doc(db, 'articles', articleId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const articleData = docSnap.data();
      // Initialize likeCount, likedBy, and comments if they do not exist
      if (!articleData.likeCount) {
        articleData.likeCount = 0;
      }
      if (!articleData.likedBy) {
        articleData.likedBy = [];
      }
      if (!articleData.comments) {
        articleData.comments = [];
      }

      // Fetch display names for comments
      const commentsWithDisplayNames = await Promise.all(
        articleData.comments.map(async (comment) => {
          const displayName = await fetchUserDisplayName(comment.uid); // Use the utility function
          return {
            ...comment,
            displayName,
          };
        })
      );

      setArticle({ ...articleData, comments: commentsWithDisplayNames });
    } else {
      console.error('No such document!');
    }
  };

  useEffect(() => {
    fetchArticle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articleId]);

  return { article, fetchArticle };
};

export default useArticle;
