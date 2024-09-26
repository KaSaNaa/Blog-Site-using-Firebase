/* eslint-disable react/prop-types */

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Box, Typography, Paper, IconButton } from '@mui/material';

const ArticleContent = ({ article, handleLike }) => {
  return (
    <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        {article.title}
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 2 }}>
        {article.content}
      </Typography>
      <Box
        component="img"
        src={article.image}
        alt={article.title}
        sx={{
          width: '100%',
          height: 'auto',
          borderRadius: 2,
          marginBottom: 2,
        }}
      />
      <Typography
        variant="body2"
        color="textSecondary"
        sx={{ marginBottom: 2 }}
      >
        {article.description}
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        sx={{ marginBottom: 2 }}
      >
        Tags: {article.tags}
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        sx={{ marginBottom: 2 }}
      >
        Posted on: {new Date(article.date.seconds * 1000).toLocaleDateString()}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
        <IconButton onClick={handleLike}>
          <ThumbUpIcon />
        </IconButton>
        <Typography>{article.likeCount} Likes</Typography>
      </Box>
    </Paper>
  );
};

export default ArticleContent;
