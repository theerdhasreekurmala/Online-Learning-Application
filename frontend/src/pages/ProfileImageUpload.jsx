import { useState } from 'react';
import API from '../api/axios';
import { Container, Button, Typography } from '@mui/material';

export default function ProfileImageUpload() {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', file);
    await API.put('/users/profile/image', formData);
    alert('Uploaded successfully');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5">Upload Profile Image</Typography>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <Button onClick={handleUpload} variant="contained" sx={{ mt: 2 }}>Upload</Button>
    </Container>
  );
}
