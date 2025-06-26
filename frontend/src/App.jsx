import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/roles/AdminDashboard';
// Import more pages...

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        {/* Add other routes here */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
