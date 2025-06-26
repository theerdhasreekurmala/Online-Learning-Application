import { useState } from 'react';
import API from '../api/axios';
import { Container, TextField, Button, Typography } from '@mui/material';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post('/users/forgot-password', { email });
    alert('Password reset link sent to your email.');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5">Forgot Password</Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth label="Email" value={email} onChange={e => setEmail(e.target.value)} margin="normal" />
        <Button type="submit" variant="contained">Send Reset Link</Button>
      </form>
    </Container>
  );
}