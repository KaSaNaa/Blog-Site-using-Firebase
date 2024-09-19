import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useState } from "react";
import { Box, Divider } from "@mui/material";
import { faker } from "@faker-js/faker";

function dataGenerator(size) {
  const data = [];
  for (let i = 0; i < size; i++) {
    const url = faker.image.url();
    const desc = faker.lorem.sentence();
    const author = faker.person.fullName();
    data.push({
      id: i,
      title: `Tutorial ${i}`,
      image: url,
      author: author,
      description: desc,
    });
  }
  return JSON.stringify(data);
}

export default function FeaturedTutorials() {
  const [showAll, setShowAll] = useState(false);

  const handleToggleShowAll = () => {
    setShowAll(!showAll);
  };
  const articles = JSON.parse(dataGenerator(10));
  const displayedArticles = showAll ? articles : articles.slice(0, 6);

  return (
      <div style={{ marginTop: '5%' }}>
        <Typography
          variant="h4"
          style={{ textAlign: "center", margin: "20px" }}
        >
          Featured Tutorials
        </Typography>
        <Divider style={{ margin: "10px 0", backgroundColor: 'white' }} />
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
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {article.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {article.description}
                    </Typography>
                    <Divider style={{ margin: "10px 0", backgroundColor: 'white' }} />
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
              {showAll ? "Show Less" : "See All Tutorials"}
            </Button>
          </Box>
        )}
      </div>
  );
}