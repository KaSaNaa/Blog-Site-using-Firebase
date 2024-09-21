import { useState, useEffect } from "react";
import {
  Container,
  TextField,
  CardContent,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../configs/firebaseConfigs";
import { useNavigate } from "react-router-dom";
import Spinner from "../misc/Spinner";

const FindQuestionPage = () => {
  const [questions, setQuestions] = useState([]);
  const [filter, setFilter] = useState("");
  const [filterType, setFilterType] = useState("title");
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/post-something");
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const querySnapshot = await getDocs(collection(db, "questions"));
        setQuestions(
          querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      } catch (error) {
        console.error("Error fetching questions: ", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchQuestions();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "questions", id));
      setQuestions(questions.filter((question) => question.id !== id));
    } catch (error) {
      console.error("Error deleting question: ", error);
    }
  };

  const filteredQuestions = questions.filter((question) => {
    if (filterType === "title") {
      return question.title.toLowerCase().includes(filter.toLowerCase());
    } else if (filterType === "tags") {
      return question.tags.toLowerCase().includes(filter.toLowerCase());
    } else if (filterType === "date") {
      return new Date(question.date.seconds * 1000)
        .toLocaleDateString()
        .includes(filter);
    }
    return true;
  });

  return (
    <Container>
      {loading && <Spinner color="#4fa94d" text="Loading Questions..." />}
      <div style={{ filter: loading ? "blur(5px)" : "none" }}>
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
          <Accordion key={question.id}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h8">{question.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <CardContent>
                <Typography variant="body2">
                  {new Date(question.date.seconds * 1000).toLocaleDateString()}
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDelete(question.id)}
                >
                  Delete
                </Button>
              </CardContent>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </Container>
  );
};

export default FindQuestionPage;