import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Divider,
} from '@mui/material';
import { useState } from 'react';

/**
 * SubscribeForm component renders a subscription form for users to subscribe to a newsletter.
 * It includes an email input field and a submit button.
 * 
 * @component
 * 
 * @example
 * return (
 *   <SubscribeForm />
 * )
 * 
 * @returns {JSX.Element} The rendered component.
 * 
 * @function
 * @name SubscribeForm
 * 
 * @description
 * This component maintains an internal state for the email input field.
 * On form submission, it sends a POST request to the server to send a welcome email.
 * 
 * @async
 * @function handleSubmit
 * @param {Object} event - The form submission event.
 * @returns {Promise<void>} A promise that resolves when the email is sent.
 * 
 * @example
 * handleSubmit(event);
 * 
 * @throws Will alert an error message if the email sending fails.
 */
export default function SubscribeForm() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(import.meta.env.VITE_SEND_WELCOME_EMAIL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        alert('Welcome email sent!');
      } else {
        alert('Error sending email');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error sending email');
    }
  };

  return (
    <Container>
      <Divider style={{ margin: '10px 0' }} />
      <Container
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="h5"
          sx={{ flexGrow: 1, textAlign: 'center', margin: '20px' }}
        >
          Subscribe to our Newsletter
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            type="email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary">
            Subscribe
          </Button>
        </Box>
      </Container>
      <Divider style={{ margin: '10px 0' }} />
    </Container>
  );
}
