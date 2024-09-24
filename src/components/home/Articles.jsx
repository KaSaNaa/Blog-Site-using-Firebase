import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { Box, Divider } from "@mui/material";
import { db } from "../../configs/firebaseConfigs";
import { collection, getDocs } from "firebase/firestore";
import axios from "axios"; // Import Axios
import { ProgressSpinner as Spinner } from "../misc/Spinner";

export default function FeaturedArticles() {
  const [articles, setArticles] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "articles"));
        const articlesData = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const data = doc.data();
            const response = await axios.post(
              import.meta.env.VITE_GET_USER_DISPLAY_NAME,
              { uid: data.uid }
            );
            const userDetails = response.data;
            return { id: doc.id, ...data, author: userDetails.displayName };
          })
        );
        setArticles(articlesData);
      } catch (error) {
        console.error("Error fetching articles: ", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchArticles();
  }, []);

  const handleToggleShowAll = () => {
    setShowAll(!showAll);
  };

  const displayedArticles = showAll ? articles : articles.slice(0, 6);

  if (loading) {
    return <Spinner text="Fetching articles from the cloud..." />; // Show spinner while loading
  }

  return (
    <div style={{ marginTop: '5%'}}>
      <Typography
        variant="h4"
        style={{ textAlign: "center", margin: "20px" }}
      >
        Featured Articles
      </Typography>
      <Divider style={{ margin: "10px 0" }} />
      <Grid container spacing={0}>
        {displayedArticles.map((article) => (
          <Grid item xs={12} sm={6} md={4} key={article.id}>
            <Card sx={{ margin: "70px" }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={article.image}
                  alt={article.title}
                  sx={{ objectFit: "contain" }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {article.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {article.description}
                  </Typography>
                  <Divider style={{ margin: "10px 0" }} />
                  <Typography fontWeight={600} variant="body2" color="text.secondary">
                    {article.author}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      {articles.length > 6 && (
        <Box display="flex" justifyContent="center" alignItems="center" mt={-6}>
          <Button
            onClick={handleToggleShowAll}
            variant="contained"
            color="primary"
            style={{ marginTop: "20px" }}
          >
            {showAll ? "Show Less" : "See All Articles"}
          </Button>
        </Box>
      )}
    </div>
  );
}