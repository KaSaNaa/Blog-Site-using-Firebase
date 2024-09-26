/* eslint-disable react/prop-types */
import { Box, Typography, TextField, Button } from '@mui/material';

const CommentForm = ({ comment, setComment, handleAddComment }) => {
  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        handleAddComment();
      }}
      sx={{ marginTop: 2 }}
    >
      <Typography variant="h6" sx={{ marginBottom: 1 }}>
        Add a Comment
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={4}
        variant="outlined"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <Button type="submit" variant="contained" color="primary">
        Submit Comment
      </Button>
    </Box>
  );
};

export default CommentForm;
