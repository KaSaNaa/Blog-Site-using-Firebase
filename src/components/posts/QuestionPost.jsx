/* eslint-disable react/no-children-prop */
import { Button, Box, TextField, Snackbar, Alert, Typography } from '@mui/material';
import { useState, useContext } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/addon/edit/closebrackets'; // Import the closebrackets addon
import { SubscriptionContext } from '../../contexts/SubscriptionContext';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

// eslint-disable-next-line react/prop-types
const QuestionPost = ({ onSubmit }) => {
  const { subscription, loading } = useContext(SubscriptionContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [markdownContent, setMarkdownContent] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleSubmit = async () => {
    try {
      if (!title || !description || !tags) {
        setSnackbarMessage('All fields are required.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
        return;
      }

      await onSubmit({ title, description, tags, markdownContent });
      setTitle('');
      setDescription('');
      setTags('');
      setMarkdownContent('');
      setSnackbarMessage('Question posted successfully!');
      setSnackbarSeverity('success');
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setSnackbarMessage('Error posting question.');
      setSnackbarSeverity('error');
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
      {!loading && subscription ? (
        <Box>
          <Typography variant="h6" gutterBottom>
            Markdown Content
          </Typography>
          <CodeMirror
            value={markdownContent}
            options={{
              mode: 'markdown',
              theme: 'material',
              lineNumbers: true,
              autoCloseBrackets: true, // Enable autoCloseBrackets
            }}
            onBeforeChange={(editor, data, value) => {
              setMarkdownContent(value);
            }}
          />
          <Typography variant="h6" gutterBottom>
            Preview
          </Typography>
          <Box sx={{ border: '1px solid #ccc', padding: 2, marginTop: 2 }}>
            <ReactMarkdown
              children={markdownContent}
              components={{
                // eslint-disable-next-line no-unused-vars
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <SyntaxHighlighter
                      children={String(children).replace(/\n$/, '')}
                      style={materialDark}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    />
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            />
          </Box>
        </Box>
      ) : (
        <Box sx={{ marginTop: 2 }}>
          <Button variant="contained" color="secondary" disabled>
            Enable Markdown Editor
          </Button>
          <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1 }}>
            Subscribe to enable markdown editor and post code snippets.
          </Typography>
        </Box>
      )}
      <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ marginTop: 2 }}>
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