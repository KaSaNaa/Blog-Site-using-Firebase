import axios from 'axios';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import { Box, Divider } from '@mui/material';
import { ProgressSpinner as Spinner } from '../misc/Spinner';
import useThemeContext from '../../hooks/useTheme';

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY; // Replace with your YouTube API key

async function fetchYouTubeVideos() {
  const response = await axios.get(
    `https://www.googleapis.com/youtube/v3/search`,
    {
      params: {
        part: 'snippet',
        q: 'React front-end development',
        type: 'video',
        maxResults: 10,
        order: 'viewCount',
        key: YOUTUBE_API_KEY,
      },
    }
  );
  return response.data.items.map((item, index) => ({
    id: index,
    title: item.snippet.title,
    image: item.snippet.thumbnails.high.url,
    author: item.snippet.channelTitle,
    description: item.snippet.description,
    videoId: item.id.videoId,
  }));
}

export default function FeaturedTutorials() {
  const [showAll, setShowAll] = useState(false);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const { theme } = useThemeContext();

  useEffect(() => {
    const fetchData = async () => {
      const videos = await fetchYouTubeVideos();
      setArticles(videos);
      setLoading(false); // Set loading to false after data is fetched
    };
    fetchData();
  }, []);

  const handleToggleShowAll = () => {
    setShowAll(!showAll);
  };

  const displayedArticles = showAll ? articles : articles.slice(0, 6);

  if (loading) {
    return <Spinner text="Loading YouTube Tutorials..." />; // Show spinner while loading
  }

  return (
    <div style={{ marginTop: '5%' }}>
      <Typography variant="h4" style={{ textAlign: 'center', margin: '20px' }}>
        Featured Tutorials
      </Typography>
      <Divider style={{ margin: '10px 0' }} />
      <Grid container spacing={0}>
        {displayedArticles.map((article) => (
          <Grid item xs={12} sm={6} md={4} key={article.id}>
            <Card sx={{
        margin: '70px',
        borderRadius: '20px', // Default rounded corners
        transition: 'transform 0.3s, box-shadow 0.3s, border-radius 0.3s',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: `5px 5px 20px ${theme.palette.primary.main}`,
        },
      }}>
              <CardActionArea
                component="a"
                href={`https://www.youtube.com/watch?v=${article.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={article.image}
                  alt={article.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {article.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {article.description}
                  </Typography>
                  <Divider
                    style={{ margin: '10px 0', backgroundColor: 'white' }}
                  />
                  <Typography
                    fontWeight={600}
                    variant="body2"
                    color="text.secondary"
                  >
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
            style={{ marginTop: '20px' }}
          >
            {showAll ? 'Show Less' : 'See All Tutorials'}
          </Button>
        </Box>
      )}
    </div>
  );
}
