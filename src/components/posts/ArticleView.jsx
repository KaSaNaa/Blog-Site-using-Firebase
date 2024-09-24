import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../configs/firebaseConfigs";
import { doc, updateDoc, arrayUnion, increment } from "firebase/firestore";
import { Box } from "@mui/material";
import { AuthContext } from "../../contexts/AuthContext";
import Spinner from "../misc/Spinner";
import useArticle from "../../hooks/useArticle";
import ArticleContent from "./ArticleView/ArticleContent";
import ArticleComments from "./ArticleView/ArticleComments";
import CommentForm from "./ArticleView/CommentForm";

const ArticleView = () => {
  const { articleId } = useParams();
  const { article, fetchArticle } = useArticle(articleId);
  const [comment, setComment] = useState("");
  const { user } = useContext(AuthContext);

  const handleAddComment = async () => {
    if (!comment.trim()) return;

    const newComment = {
      uid: user.uid,
      comment,
      date: new Date(),
    };

    const docRef = doc(db, "articles", articleId);
    await updateDoc(docRef, {
      comments: arrayUnion(newComment),
    });

    setComment("");
    fetchArticle(); // Refresh the view
  };

  const handleLike = async () => {
    if (article.likedBy.includes(user.uid)) {
      return; // User has already liked the article
    }

    const docRef = doc(db, "articles", articleId);
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
    <Box sx={{ maxWidth: 800, margin: "0 auto", padding: 2 }}>
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