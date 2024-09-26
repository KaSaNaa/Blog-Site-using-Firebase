import { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Divider,
} from '@mui/material';
import { db } from '../../configs/firebaseConfigs';
import { collection, getDocs } from 'firebase/firestore';
import { ProgressSpinner as Spinner } from '../misc/Spinner';
import { useNavigate } from 'react-router-dom';
import fetchUserDisplayName from '../../utils/fetchUserDisplayName'; // Import the utility function
import useThemeContext from '../../hooks/useTheme';

/**
 * FeaturedArticles component fetches and displays a list of articles from a Firestore collection.
 * It shows a loading spinner while fetching data and displays a limited number of articles initially,
 * with an option to show all articles.
 *
 * @component
 * @example
 * return (
 *   <FeaturedArticles />
 * )
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @function
 * @name FeaturedArticles
 *
 * @description
 * - Uses `useState` to manage articles, showAll, and loading states.
 * - Uses `useEffect` to fetch articles from Firestore on component mount.
 * - Uses `useNavigate` for navigation.
 * - Uses `useThemeContext` to get the current theme.
 * - Displays a loading spinner while fetching articles.
 * - Displays a list of articles with a "See All Articles" button to toggle between showing all articles or a limited number.
 */
export default function FeaturedArticles() {
  const [articles, setArticles] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate(); // Initialize useNavigate
  const { theme } = useThemeContext();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'articles'));
        const articlesData = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const data = doc.data();
            const displayName = await fetchUserDisplayName(data.uid); // Use the utility function
            return { id: doc.id, ...data, author: displayName };
          })
        );
        setArticles(articlesData);
      } catch (error) {
        console.error('Error fetching articles: ', error);
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
    <div style={{ marginTop: '5%' }}>
      <Typography variant="h4" style={{ textAlign: 'center', margin: '20px' }}>
        Featured Articles
      </Typography>
      <Divider style={{ margin: '10px 0' }} />
      <Grid container spacing={0}>
        {displayedArticles.map((article) => (
          <Grid item xs={12} sm={6} md={4} key={article.id}>
            <Card
              sx={{
                margin: '70px',
                borderRadius: '20px', // Default rounded corners
                transition:
                  'transform 0.3s, box-shadow 0.3s, border-radius 0.3s',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: `5px 5px 20px ${theme.palette.primary.main}`, 
                },
              }}
            >
              <CardActionArea
                onClick={() => navigate(`/article/${article.id}`)}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={article.image}
                  alt={article.title}
                  sx={{ objectFit: 'contain' }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {article.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {article.description}
                  </Typography>
                  <Divider style={{ margin: '10px 0' }} />
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
            {showAll ? 'Show Less' : 'See All Articles'}
          </Button>
        </Box>
      )}
    </div>
  );
}
