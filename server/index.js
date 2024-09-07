const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cargoRoutes = require('./routes/cargo');
const bidRoutes = require('./routes/bids');
const cronJobs = require('./jobs/cronJobs');
const tenderRoutes = require('./routes/tender');

dotenv.config();
connectDB();

const app = express();

app.use(cors({
    origin: 'https://tender-rrhw.vercel.app/', // Replace with your frontend's origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());

app.use('/api/cargo', cargoRoutes);
app.use('/api/bids', bidRoutes);
app.use('/api/tender', tenderRoutes);
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
  
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
