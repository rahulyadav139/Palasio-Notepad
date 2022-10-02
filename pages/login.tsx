import React, { useState } from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';

interface Credentials {
  email: string;
  password: string;
}

const initialState: Credentials = { email: '', password: '' };

export default function Login() {
  const [{ email, password }, setCredentials] = useState(initialState);

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLoginUser = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();

    try {
      const { data } = await axios.post('/api/auth/login', { email, password });

      console.log(data);
    } catch (err) {}
  };
  return (
    <Grid
      component="main"
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        height: '100vh',
        width: '100vw',
        background: 'rgba(255, 255, 255, 0.3)',
      }}
    >
      <Box
        component="form"
        onSubmit={handleLoginUser}
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 350,
          maxWidth: '100%',
        }}
      >
        <Typography gutterBottom variant="h2" align="center">
          Sign In
        </Typography>
        <Typography marginBottom={2} variant="body1" align="center">
          Sign in and start managing your notes
        </Typography>
        <TextField
          fullWidth
          value={email}
          name="email"
          onChange={handleUserInput}
          placeholder="Email"
          size="small"
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          placeholder="Password"
          name="password"
          onChange={handleUserInput}
          type="password"
          size="small"
          sx={{ mb: 3 }}
        />

        <Button type="submit" disableElevation variant="contained">
          Login
        </Button>
      </Box>
    </Grid>
  );
}
