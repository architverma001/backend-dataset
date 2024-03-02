// index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Data = require('./models/dataModel');
const cors = require('cors');
const app = express();
const PORT = 8000;

// Connect to MongoDB (Make sure your MongoDB server is running)
mongoose.connect('mongodb+srv://arpitverma2410:sheela2005@cluster0.espfs10.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Connected to MongoDB');
    }
).catch((error) => {
    console.log('Error: ', error);
}
);

// Middleware
app.use(bodyParser.json());
app.use(cors());
// POST request to add data
app.post('/api/data', async (req, res) => {
  try {
    const newData = new Data(req.body);
    await newData.save();
    res.status(201).json({ success: true, data: newData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET request to retrieve all data
app.get('/api/data', async (req, res) => {
  try {
    const allData = await Data.find();
    res.status(200).json({ success: true, data: allData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
