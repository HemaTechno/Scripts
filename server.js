// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON data

// اتصال بقاعدة بيانات MongoDB
mongoose.connect('mongodb://localhost:27017/scriptsDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// إنشاء نموذج بيانات (Schema) للمربعات
const scriptSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
  youtubeLink: String,
  scriptText: String
});

const Script = mongoose.model('Script', scriptSchema);

// API لاسترجاع البيانات
app.get('/api/scripts', async (req, res) => {
  const scripts = await Script.find();
  res.send(scripts);
});

// API لإضافة بيانات جديدة
app.post('/api/scripts', async (req, res) => {
  const newScript = new Script({
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    youtubeLink: req.body.youtubeLink,
    scriptText: req.body.scriptText
  });
  
  await newScript.save();
  res.send(newScript);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
