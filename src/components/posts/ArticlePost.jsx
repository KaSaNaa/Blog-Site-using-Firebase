import {
  Button,
  Box,
  TextField,
  Snackbar,
  Alert,
  Typography,
  Grid,
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image'; // Import ImageIcon from Material-UI
import { useState } from 'react';

// eslint-disable-next-line react/prop-types
const ArticlePost = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState(''); // Changed from abstract to description
  const [content, setContent] = useState(''); // Changed from articleText to content
  const [tags, setTags] = useState('');
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState('');
  const [imagePreviewUrl, setImagePreviewUrl] = useState(''); // New state for image preview URL
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleSubmit = async () => {
    try {
      if (!title || !description || !content || !tags) {
        setSnackbarMessage('All fields are required.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
        return;
      }

      await onSubmit({ title, description, content, tags, image });
      setTitle('');
      setDescription('');
      setContent('');
      setTags('');
      setImage(null);
      setImageName('');
      setImagePreviewUrl(''); // Reset image preview URL
      setSnackbarMessage('Article posted successfully!');
      setSnackbarSeverity('success');
      console.log(title, description, content, tags, image);
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setSnackbarMessage('Error posting article.');
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImageName(file ? file.name : '');
    setImagePreviewUrl(file ? URL.createObjectURL(file) : ''); // Generate image preview URL
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
        placeholder="Enter the title of your article"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        fullWidth
        label="Description" // Changed from Abstract to Description
        margin="normal"
        variant="outlined"
        multiline
        rows={2}
        placeholder="Provide a brief summary of your article"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        fullWidth
        label="Content" // Changed from Article Text to Content
        margin="normal"
        variant="outlined"
        multiline
        rows={6}
        placeholder="Write the main content of your article"
        value={content}
        onChange={(e) => setContent(e.target.value)}
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
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={6} display="flex" alignItems="center">
          <input
            type="file"
            style={{ display: 'none' }}
            id="upload-button"
            onChange={handleFileChange}
            accept="image/*"
          />
          <label htmlFor="upload-button">
            <Button variant="contained" color="primary" component="span">
              Upload Image
            </Button>
          </label>
          {imageName && (
            <Typography variant="body2" color="textSecondary" sx={{ ml: 2 }}>
              Selected file: {imageName}
            </Typography>
          )}
          <Box
            component="div"
            sx={{
              width: 100,
              height: 100,
              border: '1px solid #ccc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 2,
            }}
          >
            {imagePreviewUrl ? (
              <img
                src={imagePreviewUrl}
                alt="Image preview"
                style={{ maxWidth: '100%', maxHeight: '100%' }}
              />
            ) : (
              <ImageIcon style={{ fontSize: 50, color: '#ccc' }} />
            )}
          </Box>
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="flex-end">
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Post
          </Button>
        </Grid>
      </Grid>
      <Snackbar open={snackbarOpen} autoHideDuration={6000}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ArticlePost;
