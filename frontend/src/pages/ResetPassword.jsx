import { useState } from 'react';
import API from '../api/axios';
import { useParams } from 'react-router-dom';
import { Container, TextField, Button, Typography } from '@mui/material';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post(`/users/reset-password/${token}`, { password });
    alert('Password reset successfully.');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5">Reset Password</Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth label="New Password" type="password" value={password} onChange={e => setPassword(e.target.value)} margin="normal" />
        <Button type="submit" variant="contained">Reset</Button>
      </form>
    </Container>
  );
}
