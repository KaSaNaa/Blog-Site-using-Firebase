import { Container, Typography, Box, Link, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

/**
 * Footer component that displays the footer section of the website.
 * 
 * The footer includes:
 * - A title "Dev at Deakin"
 * - A subtitle "Empowering developers to innovate and create."
 * - Contact information including email, phone number, and a contact form link
 * - Social media icons linking to Facebook, Twitter, Instagram, and LinkedIn
 * - Copyright information with the current year
 * 
 * @component
 * @returns {JSX.Element} The rendered footer component
 */
export default function Footer() {
  return (
    <Box
      sx={{
        bgcolor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
        py: 3,
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom>
          Dev at Deakin
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          Empowering developers to innovate and create.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Link href="mailto:contact@devdeakin.com" color="inherit" sx={{ mx: 1 }}>
            contact@devdeakin.com
          </Link>
          <Link href="tel:+1234567890" color="inherit" sx={{ mx: 1 }}>
            +1 (234) 567-890
          </Link>
          <Link href="https://devdeakin.com/contact" color="inherit" sx={{ mx: 1 }}>
            Contact Form
          </Link>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <IconButton
            href="https://facebook.com"
            color="inherit"
            sx={{ mx: 1 }}
          >
            <Facebook />
          </IconButton>
          <IconButton href="https://twitter.com" color="inherit" sx={{ mx: 1 }}>
            <Twitter />
          </IconButton>
          <IconButton
            href="https://instagram.com"
            color="inherit"
            sx={{ mx: 1 }}
          >
            <Instagram />
          </IconButton>
          <IconButton
            href="https://linkedin.com"
            color="inherit"
            sx={{ mx: 1 }}
          >
            <LinkedIn />
          </IconButton>
        </Box>
        <Typography
          variant="body2"
          color="textSecondary"
          align="center"
          sx={{ mt: 2 }}
        >
          {'© '}
          {new Date().getFullYear()}
          {' Dev @ Deakin. All rights reserved.'}
        </Typography>
      </Container>
    </Box>
  );
}
