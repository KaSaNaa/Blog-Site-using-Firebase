import { useState, useContext } from "react";
import {
  Container,
  Button,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { addPost } from "../services/posts";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../configs/firebaseConfigs";
import { Oval } from "react-loader-spinner";

const PostPage = () => {
  const [postType, setPostType] = useState("question");
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleNavigate = () => {
    navigate("/find-questions");
  };

  const handlePostSubmit = async (postData) => {
    if (!user) {
      console.error("User not authenticated");
      return;
    }

    // Validation logic
    if (!postData.title || !postData.description || !postData.tags) {
      setSnackbarMessage("All fields are required.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    setLoading(true);

    try {
      let imageUrl = null;
      if (postData.image) {
        const imageRef = ref(storage, `images/${postData.image.name}`);
        const snapshot = await uploadBytes(imageRef, postData.image);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      const postWithImageUrl = { ...postData, image: imageUrl };
      await addPost(postType, postWithImageUrl, user.uid);
      setLoading(false);
      setSnackbarMessage("Post submitted successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      handleNavigate();
      console.log(`${postType} posted successfully!`);
    } catch (error) {
      console.error(`Error posting ${postType}: `, error);
      setLoading(false);
      setSnackbarMessage("Error submitting post.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  return (
    <Container>
      {loading && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Oval
            height={80}
            width={80}
            color="#4fa94d"
            visible={true}
            ariaLabel='oval-loading'
            secondaryColor="#4fa94d"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
          <Typography variant="h6" color="textSecondary" style={{ marginTop: '20px' }}>
            Uploading Post...
          </Typography>
        </div>
      )}
      <div style={{ filter: loading ? 'blur(5px)' : 'none' }}>
        <Box my={2}>
          <Button variant="contained" color="primary" onClick={handleNavigate}>
            Find Questions
          </Button>
        </Box>
        <PostTypeSelector postType={postType} setPostType={setPostType} />
        {postType === "question" ? (
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
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
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

// eslint-disable-next-line react/prop-types
const ArticlePost = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [articleText, setArticleText] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleSubmit = async () => {
    try {
      if (!title || !abstract || !articleText || !tags) {
        setSnackbarMessage("All fields are required.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
      }

      await onSubmit({ title, abstract, articleText, tags, image });
      setTitle("");
      setAbstract("");
      setArticleText("");
      setTags("");
      setImage(null);
      setImageName("");
      setSnackbarMessage("Article posted successfully!");
      setSnackbarSeverity("success");
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setSnackbarMessage("Error posting article.");
      setSnackbarSeverity("error");
    } finally {
      setSnackbarOpen(true);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImageName(file ? file.name : "");
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
        label="Abstract"
        margin="normal"
        variant="outlined"
        multiline
        rows={2}
        placeholder="Provide a brief summary of your article"
        value={abstract}
        onChange={(e) => setAbstract(e.target.value)}
      />
      <TextField
        fullWidth
        label="Article Text"
        margin="normal"
        variant="outlined"
        multiline
        rows={6}
        placeholder="Write the main content of your article"
        value={articleText}
        onChange={(e) => setArticleText(e.target.value)}
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
      <input
        type="file"
        style={{ display: "none" }}
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
        <Typography variant="body2" color="textSecondary">
          Selected file: {imageName}
        </Typography>
      )}
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Post
      </Button>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PostPage;