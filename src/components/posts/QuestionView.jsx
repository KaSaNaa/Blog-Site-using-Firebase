/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AnswerForm from "./AnswerForm";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../configs/firebaseConfigs";
import axios from "axios"; // Import Axios

const QuestionView = ({ question }) => {
  const [answers, setAnswers] = useState([]);
  const [showAnswers, setShowAnswers] = useState(false);
  const [questionDisplayName, setQuestionDisplayName] = useState("");

  useEffect(() => {
    const fetchDisplayName = async (uid) => {
      try {
        const response = await axios.post(
          "https://us-central1-devdeakinlogin.cloudfunctions.net/getUserDisplayName",
          { uid }
        );
        return response.data.displayName;
      } catch (error) {
        console.error("Error fetching user display name:", error);
        return uid; // Fallback to uid if there's an error
      }
    };

    const fetchAnswers = async () => {
      if (showAnswers) {
        const q = query(
          collection(db, "answers"),
          where("questionId", "==", question.id)
        );
        const querySnapshot = await getDocs(q);
        const answersData = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const data = doc.data();
            const displayName = await fetchDisplayName(data.uid);
            return { id: doc.id, ...data, displayName };
          })
        );
        setAnswers(answersData);
      }
    };

    const fetchQuestionDisplayName = async () => {
      const displayName = await fetchDisplayName(question.uid);
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
            Posted by: {questionDisplayName} on{" "}
            {question.date && question.date.seconds
              ? new Date(question.date.seconds * 1000).toLocaleDateString()
              : "Unknown Date"}
          </Typography>
          {showAnswers && (
            <Box mt={2}>
              <Typography variant="h6">Answers</Typography>
              {answers.map((answer) => (
                <Box key={answer.id} mt={2}>
                  <Typography>{answer.answer}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Posted by: {answer.displayName} on{" "}
                    {answer.date && answer.date.seconds
                      ? new Date(
                          answer.date.seconds * 1000
                        ).toLocaleDateString()
                      : "Unknown Date"}
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
