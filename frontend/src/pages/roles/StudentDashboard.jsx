import { useEffect, useState } from 'react';
import API from '../../api/axios';
import { Card, CardContent, Typography, Button, Grid, Tabs, Tab } from '@mui/material';

export default function StudentDashboard() {
  const [tab, setTab] = useState(0);
  const [courses, setCourses] = useState([]);
  const [enrolled, setEnrolled] = useState([]);

  useEffect(() => {
    API.get('/student/courses').then(res => setCourses(res.data));
    API.get('/student/enrolled').then(res => setEnrolled(res.data));
  }, []);

  const enroll = async (id) => {
    await API.post(`/student/enroll/${id}`);
    alert('Enrolled successfully!');
  };

  const renderCourses = (list, showEnroll) => (
    <Grid container spacing={2} padding={2}>
      {list.map(course => (
        <Grid item xs={12} sm={6} md={4} key={course._id}>
          <Card>
            <CardContent>
              <Typography variant="h6">{course.title}</Typography>
              <Typography>{course.description}</Typography>
              <Typography variant="subtitle2">₹{course.price}</Typography>
              {showEnroll && (
                <Button onClick={() => enroll(course._id)} variant="contained" sx={{ mt: 1 }}>Enroll</Button>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <>
      <Tabs value={tab} onChange={(e, v) => setTab(v)} centered>
        <Tab label="Available Courses" />
        <Tab label="My Courses" />
      </Tabs>
      {tab === 0 ? renderCourses(courses, true) : renderCourses(enrolled, false)}
    </>
  );
}
