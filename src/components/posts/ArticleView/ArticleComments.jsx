/* eslint-disable react/prop-types */
import { Box, Typography, Divider, Paper } from '@mui/material';

const ArticleComments = ({ comments }) => {
  return (
    <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Comments
      </Typography>
      {comments.map((comment, index) => (
        <Box key={index} sx={{ marginBottom: 2 }}>
          <Typography variant="body1">{comment.comment}</Typography>
          <Typography variant="body2" color="textSecondary">
            Posted by: {comment.displayName} on{' '}
            {new Date(comment.date.seconds * 1000).toLocaleDateString()}
          </Typography>
          <Divider sx={{ marginY: 1 }} />
        </Box>
      ))}
    </Paper>
  );
};

export default ArticleComments;
