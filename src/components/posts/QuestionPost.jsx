import { Button, Box, TextField, Snackbar, Alert } from "@mui/material";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
const QuestionPost = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleSubmit = async () => {
    try {
      if (!title || !description || !tags) {
        setSnackbarMessage("All fields are required.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
      }

      await onSubmit({ title, description, tags });
      setTitle("");
      setDescription("");
      setTags("");
      setSnackbarMessage("Question posted successfully!");
      setSnackbarSeverity("success");
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setSnackbarMessage("Error posting question.");
      setSnackbarSeverity("error");
    } finally {
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box component="form" noValidate autoComplete="off">
      <TextField
        fullWidth
        label="Title"
        margin="normal"
        variant="outlined"
        placeholder="Enter the title of your question"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        fullWidth
        label="Describe your problem"
        margin="normal"
        variant="outlined"
        multiline
        rows={4}
        placeholder="Describe your problem in detail in 1 or 2 paragraphs"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        fullWidth
        label="Tags"
        margin="normal"
        variant="outlined"
        placeholder="Enter tags separated by commas"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Post
      </Button>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default QuestionPost;