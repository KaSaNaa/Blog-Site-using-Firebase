import { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
} from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../configs/firebaseConfigs';
import { useNavigate } from 'react-router-dom';
import Spinner from '../misc/Spinner';
import QuestionView from './QuestionView';
import fetchUserDisplayName from '../../utils/fetchUserDisplayName';

/**
 * FindQuestionPage component fetches and displays a list of questions from a database.
 * It allows users to filter questions by title, tags, or date.
 * 
 * @component
 * @example
 * return (
 *   <FindQuestionPage />
 * )
 * 
 * @returns {JSX.Element} The rendered component.
 * 
 * @function
 * @name FindQuestionPage
 * 
 * @description
 * - Uses `useState` to manage questions, filter, filterType, and loading state.
 * - Uses `useEffect` to fetch questions from the database on component mount.
 * - Filters questions based on the selected filter type and filter value.
 * - Navigates to the post creation page when the "Post something" button is clicked.
 * 
 * @requires useState
 * @requires useEffect
 * @requires useNavigate
 * @requires getDocs
 * @requires collection
 * @requires db
 * @requires fetchUserDisplayName
 * @requires Container
 * @requires Spinner
 * @requires Box
 * @requires Button
 * @requires FormControl
 * @requires InputLabel
 * @requires Select
 * @requires MenuItem
 * @requires TextField
 * @requires QuestionView
 */
const FindQuestionPage = () => {
  const [questions, setQuestions] = useState([]);
  const [filter, setFilter] = useState('');
  const [filterType, setFilterType] = useState('title');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/post-something');
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'questions'));
        const questionsWithUserDetails = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const data = doc.data();
            const displayName = await fetchUserDisplayName(data.uid); // Use the utility function
            return { id: doc.id, ...data, displayName };
          })
        );
        setQuestions(questionsWithUserDetails);
      } catch (error) {
        console.error('Error fetching questions: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const filteredQuestions = questions.filter((question) => {
    if (filterType === 'title') {
      return question.title.toLowerCase().includes(filter.toLowerCase());
    } else if (filterType === 'tags') {
      return question.tags.toLowerCase().includes(filter.toLowerCase());
    } else if (filterType === 'date') {
      return new Date(question.date.seconds * 1000)
        .toLocaleDateString()
        .includes(filter);
    }
    return true;
  });

  return (
    <Container>
      {loading && <Spinner color="#4fa94d" text="Loading Questions..." />}
      <div style={{ filter: loading ? 'blur(5px)' : 'none' }}>
        <Box my={2}>
          <Button variant="contained" onClick={handleNavigate}>
            Post something
          </Button>
        </Box>
        <FormControl fullWidth margin="normal">
          <InputLabel>Filter By</InputLabel>
          <Select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <MenuItem value="title">Title</MenuItem>
            <MenuItem value="tags">Tags</MenuItem>
            <MenuItem value="date">Date</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Search"
          margin="normal"
          variant="outlined"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        {filteredQuestions.map((question) => (
          <QuestionView key={question.id} question={question} />
        ))}
      </div>
    </Container>
  );
};

export default FindQuestionPage;
