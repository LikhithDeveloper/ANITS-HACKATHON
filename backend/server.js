const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/talentscout')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const screeningRoutes = require('./routes/screeningRoutes');

// Routes
app.use('/api/screening', screeningRoutes);

app.get('/', (req, res) => {
  res.send('TalentScout AI API is running...');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
