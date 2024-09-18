import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { Container, Typography, Box, TextField, Button, Link } from '@mui/material';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../configs/firebaseConfigs';

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const saltRounds = 10;
      bcrypt.hash(password, saltRounds, async (err, hashedPassword) => {
        if (err) {
          setError('Error signing up');
          return;
        }
        try {
          const userId = uuidv4();
          const docRef = await addDoc(collection(db, 'users'), {
            id: userId,
            name,
            lastName,
            email,
            password: hashedPassword,
          });
          console.log("Document written with ID: ", docRef.id);
          navigate('/login');
        } catch (e) {
          console.error("Error adding document: ", e);
          setError('Error signing up');
        }
      });
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError('Error signing up');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h2" gutterBottom>
        Sign Up
      </Typography>
      <Box component="form" onSubmit={handleSignUp} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="First Name"
          name="name"
          autoComplete="given-name"
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="lastName"
          label="Last Name"
          name="lastName"
          autoComplete="family-name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
        <Typography variant="body2">
          Already have an account? <Link href="/login">Login</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default SignUpPage;