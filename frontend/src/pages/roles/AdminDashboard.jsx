import { useEffect, useState } from 'react';
import API from '../../api/axios';
import {
  Container, Typography, Table, TableHead, TableRow, TableCell, TableBody,
  TablePagination, IconButton, TextField, Grid, Card, CardContent
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); // ✅ Default supported value
  const [search, setSearch] = useState('');

useEffect(() => {
    const token = localStorage.getItem('access_token');
    console.log("🔐 Token from localStorage:", token);
      API.get('/admin/users')
        .then(res => {
            console.log("✅ Admin users fetched:", res.data);
            setUsers(res.data);
            setFiltered(res.data);
        })
        .catch(err => {
            console.error("❌ Failed to fetch admin users:", err);
        });
}, []);


  useEffect(() => {
    const f = users.filter(u =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(f);
  }, [search, users]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const countByRole = (role) => users.filter(u => u.role === role).length;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>Admin Dashboard</Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ backgroundColor: '#e3f2fd' }}>
            <CardContent>
              <Typography variant="h6"><PeopleIcon /> Total Users</Typography>
              <Typography variant="h4">{users.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ backgroundColor: '#f3e5f5' }}>
            <CardContent>
              <Typography variant="h6"><SchoolIcon /> Students</Typography>
              <Typography variant="h4">{countByRole('student')}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ backgroundColor: '#e8f5e9' }}>
            <CardContent>
              <Typography variant="h6"><AdminPanelSettingsIcon /> Admins</Typography>
              <Typography variant="h4">{countByRole('admin')}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <TextField
        label="Search users"
        fullWidth
        margin="normal"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(u => (
            <TableRow key={u._id}>
              <TableCell>{u.name}</TableCell>
              <TableCell>{u.email}</TableCell>
              <TableCell>{u.role}</TableCell>
              <TableCell>
                <IconButton><EditIcon /></IconButton>
                <IconButton><DeleteIcon /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={filtered.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
}


 // const token = localStorage.getItem('access_token');
    // if (!token) {
    //   console.warn("⚠️ No token found in localStorage.");
    //   return;
    // }
   