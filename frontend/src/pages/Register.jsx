import { useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Select, MenuItem, Typography } from '@mui/material';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' });
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await API.post('/users/register', form);
      alert('Registered! Please login.');
      navigate('/login');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Register</Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth label="Name" name="name" margin="normal" onChange={handleChange} />
        <TextField fullWidth label="Email" name="email" margin="normal" onChange={handleChange} />
        <TextField fullWidth label="Password" name="password" type="password" margin="normal" onChange={handleChange} />
        <Select fullWidth name="role" value={form.role} onChange={handleChange} sx={{ mb: 2 }}>
          <MenuItem value="student">Student</MenuItem>
          <MenuItem value="educator">Educator</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </Select>
        <Button type="submit" variant="contained" fullWidth>Register</Button>
      </form>
    </Container>
  );
}
