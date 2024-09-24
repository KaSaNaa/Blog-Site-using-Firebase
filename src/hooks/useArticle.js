import { useState, useEffect } from "react";
import { db } from "../configs/firebaseConfigs";
import { doc, getDoc } from "firebase/firestore";
import fetchUserDisplayName from "../utils/fetchUserDisplayName"; // Import the utility function

const useArticle = (articleId) => {
  const [article, setArticle] = useState(null);

  const fetchArticle = async () => {
    const docRef = doc(db, "articles", articleId);
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
      console.error("No such document!");
    }
  };

  useEffect(() => {
    fetchArticle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articleId]);

  return { article, fetchArticle };
};

export default useArticle;