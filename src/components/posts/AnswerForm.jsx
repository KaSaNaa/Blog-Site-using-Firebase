import { useContext, useState, useEffect } from 'react';
import { db } from '../../configs/firebaseConfigs';
import { addDoc, collection } from 'firebase/firestore';
import { AuthContext } from '../../contexts/AuthContext.jsx';
import { Box, Button, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import fetchUserDisplayName from '../../utils/fetchUserDisplayName.js';

const AnswerForm = ({ questionId, onAnswerSubmit }) => {
  const [answer, setAnswer] = useState('');
  const [displayName, setDisplayName] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchDisplayName = async () => {
      try {
        const displayName = await fetchUserDisplayName(user.uid); // Use the utility function
        setDisplayName(displayName);
      } catch (error) {
        console.error('Error fetching user display name:', error);
      }
    };

    if (user && user.uid) {
      fetchDisplayName();
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!answer.trim()) return;

    try {
      const newAnswer = {
        questionId,
        answer,
        uid: user.uid,
        displayName, // Store the display name
        date: new Date(),
      };
      const docRef = await addDoc(collection(db, 'answers'), newAnswer);
      setAnswer('');
      if (onAnswerSubmit) {
        onAnswerSubmit({ id: docRef.id, ...newAnswer });
      }
    } catch (error) {
      console.error('Error adding answer:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h6">Your Answer</Typography>
      <TextField
        fullWidth
        multiline
        rows={4}
        variant="outlined"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        sx={{ mt: 1 }}
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Submit Answer
      </Button>
    </Box>
  );
};

AnswerForm.propTypes = {
  questionId: PropTypes.string.isRequired,
  onAnswerSubmit: PropTypes.func, // Add prop type for the callback function
};

export default AnswerForm;
