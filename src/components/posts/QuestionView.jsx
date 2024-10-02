/* eslint-disable react/no-children-prop */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CardContent,
  Typography,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AnswerForm from './AnswerForm';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../configs/firebaseConfigs';
import fetchUserDisplayName from '../../utils/fetchUserDisplayName'; // Import the utility function
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const QuestionView = ({ question }) => {
  const [answers, setAnswers] = useState([]);
  const [showAnswers, setShowAnswers] = useState(false);
  const [questionDisplayName, setQuestionDisplayName] = useState('');

  useEffect(() => {
    const fetchAnswers = async () => {
      if (showAnswers) {
        const q = query(
          collection(db, 'answers'),
          where('questionId', '==', question.id)
        );
        const querySnapshot = await getDocs(q);
        const answersData = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const data = doc.data();
            const displayName = await fetchUserDisplayName(data.uid); // Use the utility function
            return { id: doc.id, ...data, displayName };
          })
        );
        setAnswers(answersData);
      }
    };

    const fetchQuestionDisplayName = async () => {
      const displayName = await fetchUserDisplayName(question.uid); // Use the utility function
      setQuestionDisplayName(displayName);
    };

    fetchQuestionDisplayName();
    fetchAnswers();
  }, [showAnswers, question.id, question.uid]);

  const handleAnswerSubmit = (newAnswer) => {
    setAnswers((prevAnswers) => [...prevAnswers, newAnswer]);
  };

  return (
    <Accordion onChange={() => setShowAnswers(!showAnswers)}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">{question.title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <CardContent>
          <Typography gutterBottom>{question.description}</Typography>
          <Typography variant="body2" color="textSecondary">
            Posted by: {questionDisplayName} on{' '}
            {question.date && question.date.seconds
              ? new Date(question.date.seconds * 1000).toLocaleDateString()
              : 'Unknown Date'}
          </Typography>
          <Box sx={{ border: '1px solid #ccc', padding: 2, marginTop: 2 }}>
            <ReactMarkdown
              children={question.markdownContent}
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
          {showAnswers && (
            <Box mt={2}>
              <Typography variant="h6">Answers</Typography>
              {answers.map((answer) => (
                <Box key={answer.id} mt={2}>
                  <Typography sx={{ gutterBottom: true }}>
                    {answer.answer}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Posted by: {answer.displayName} on{' '}
                    {answer.date && answer.date.seconds
                      ? new Date(
                          answer.date.seconds * 1000
                        ).toLocaleDateString()
                      : 'Unknown Date'}
                  </Typography>
                </Box>
              ))}
              <AnswerForm
                questionId={question.id}
                onAnswerSubmit={handleAnswerSubmit}
              />
            </Box>
          )}
        </CardContent>
      </AccordionDetails>
    </Accordion>
  );
};

export default QuestionView;