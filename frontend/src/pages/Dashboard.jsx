import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import StudentDashboard from './roles/StudentDashboard';
import EducatorDashboard from './roles/EducatorDashboard';
import AdminDashboard from './roles/AdminDashboard';

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  if (!user) return <p>Loading...</p>;

  switch (user.role) {
    case 'student': return <StudentDashboard />;
    case 'educator': return <EducatorDashboard />;
    case 'admin': return <AdminDashboard />;
    default: return <p>Unknown role</p>;
  }
}