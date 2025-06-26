import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/axios';
import { Container, Typography, Card, CardContent } from '@mui/material';

export default function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    API.get(`/courses/${id}`).then(res => setCourse(res.data));
  }, [id]);

  if (!course) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h4">{course.title}</Typography>
          <Typography>{course.description}</Typography>
          <Typography sx={{ mt: 2 }}>Price: ₹{course.price}</Typography>
        </CardContent>
      </Card>
    </Container>
  );
}
