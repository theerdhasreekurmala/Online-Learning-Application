const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const path = require('path');

dotenv.config();
connectDB();
const app = express();
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};
//app.use(cors());
// Replace with this CORS config:
app.use(cors({
  origin: 'http://localhost:5173', // frontend URL
  credentials: true,               // allow cookies and auth headers
}));
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/student', require('./routes/studentRoutes'));
app.use('/api/educator', require('./routes/educatorRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));


// Uploads folder for file uploads
app.use('/uploads', express.static('uploads'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cookieParser());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

