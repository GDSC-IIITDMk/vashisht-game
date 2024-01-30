// app.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Connect to MongoDB
mongoose.connect('mongodb+srv://jashwanth0712:vashishtpassword@vashisht.skfu3pn.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// Define schema
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: String,
  balance: Number
});

// Create model
const User = mongoose.model('User', userSchema);

// Create Express app
const app = express();
app.use(bodyParser.json());

// Define a route to create a new user
app.post('/users', async (req, res) => {
  try {
    const { name, balance } = req.body;
    const newUser = new User({ name, balance });
    await newUser.save();
    res.json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Define a route to get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Define a route to get a single user by ID
app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Define a route to update a user by ID
app.put('/users/:id', async (req, res) => {
  try {
    const { name, balance } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { name, balance }, { new: true });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Define a route to delete a user by ID
app.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json({ msg: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
