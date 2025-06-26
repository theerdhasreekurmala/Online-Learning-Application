import { useEffect, useState } from 'react';
import API from '../../api/axios';
import {
  Container, Typography, Card, CardContent,
  Grid, Button, Dialog, DialogTitle, DialogContent,
  TextField, DialogActions
} from '@mui/material';

// export default function EducatorDashboard() {
//   const [course, setCourse] = useState({ title: '', description: '', price: '' });

//   const handleChange = (e) => {
//     setCourse({ ...course, [e.target.name]: e.target.value });
//   };

  export default function EducatorDashboard() {
  const [courses, setCourses] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post('/educator/create', course);
    alert('Course created!');
    setCourse({ title: '', description: '', price: '' });
  };

   useEffect(() => {
    load();
  }, []);

  const load = () => {
    API.get('/educator/courses').then(res => setCourses(res.data));
  };

  const handleEdit = (course) => {
    setEditing(course);
    setEditOpen(true);
  };

  const handleDelete = async (id) => {
    await API.delete(`/educator/course/${id}`);
    load();
  };

  const saveCourse = async () => {
    await API.put(`/educator/course/${editing._id}`, editing);
    setEditOpen(false);
    load();
  };

//   return (
//     <Container maxWidth="sm" sx={{ mt: 4 }}>
//       <Typography variant="h5">Create New Course</Typography>
//       <form onSubmit={handleSubmit}>
//         <TextField fullWidth label="Title" name="title" margin="normal" onChange={handleChange} value={course.title} />
//         <TextField fullWidth label="Description" name="description" margin="normal" onChange={handleChange} value={course.description} />
//         <TextField fullWidth label="Price" name="price" type="number" margin="normal" onChange={handleChange} value={course.price} />
//         <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Create</Button>
//       </form>
//     </Container>
//   );

return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>My Courses</Typography>
      <Grid container spacing={2}>
        {courses.map(c => (
          <Grid item xs={12} sm={6} md={4} key={c._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{c.title}</Typography>
                <Typography>{c.description}</Typography>
                <Typography>₹{c.price}</Typography>
                <Button onClick={() => handleEdit(c)} size="small">Edit</Button>
                <Button onClick={() => handleDelete(c._id)} size="small">Delete</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <DialogTitle>Edit Course</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Title" value={editing?.title || ''} onChange={e => setEditing({ ...editing, title: e.target.value })} />
          <TextField fullWidth label="Description" value={editing?.description || ''} onChange={e => setEditing({ ...editing, description: e.target.value })} />
          <TextField fullWidth label="Price" value={editing?.price || ''} onChange={e => setEditing({ ...editing, price: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancel</Button>
          <Button onClick={saveCourse} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}