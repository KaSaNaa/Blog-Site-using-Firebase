import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import { faker } from '@faker-js/faker';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const imgUrl = faker.image.urlLoremFlickr();

export default function HeaderImg() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Card sx={{ maxWidth: '100%', height: '350px', margin: '20px' }}>
        <CardActionArea>
          <CardMedia
            component="img"
            image={imgUrl}
            alt="green iguana"
            style={{ objectFit: 'cover', objectPosition: 'center', height: '100%', width: '100%' }}
          />
        </CardActionArea>
      </Card>
    </ThemeProvider>
  );
}