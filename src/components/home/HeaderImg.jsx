import Card from '@mui/material/Card';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const gifUrl =
  'https://cdn.dribbble.com/users/244516/screenshots/15180098/media/35301f78c0ba0d242a6703b927814e23.gif'; // Replace with your GIF URL

export default function HeaderImg() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Card
        sx={{
          maxWidth: '100%',
          height: { xs: '190px', sm: '285px', md: '332.5px' }, // Adjusted height to account for cropping
          margin: '20px',
          padding: '80px',
          overflow: 'hidden', // Hide overflow
          position: 'relative',
          backgroundColor: 'white',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: '-5%', // Move the bottom up by 5%
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundImage: `url(${gifUrl})`,
          }}
        />
      </Card>
    </ThemeProvider>
  );
}
