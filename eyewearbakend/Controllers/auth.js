const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../Models/userModel');
const upload = require('../Middleware/upload');

const authUser = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(404).send({ error: 'Username not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).send({ error: 'Password does not match' });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.status(200).send({
      msg: 'Login Successful...!',
      username: user.username,
      isAdmin: user.isAdmin,
      userId: user._id,
      token,
    });
  } catch (error) {
    console.log(error); // Log the error to the console
    return res.status(500).send({ error });
  }
};


const registerUser = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      res.status(400).json({ message: 'Profile picture upload failed' });
      return;
    }

    const { username, email, password, isAdmin } = req.body;

    try {
      const userExists = await UserModel.findOne({ email });

      if (userExists) {
        res.status(409).json({ message: 'User already exists' });
        return;
      }

      const hashPassword = await bcrypt.hash(password, 10);

      const user = new UserModel({
        username,
        email,
        password: hashPassword,
        isAdmin,
        pic: req.file ? req.file.path : null,
      });

      const savedUser = await user.save();

      res.status(201).json({
        _id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        isAdmin: savedUser.isAdmin,
        pic: savedUser.pic,
      });
    } catch (error) {
      if (error.name === 'ValidationError') {
        const validationErrors = Object.values(error.errors).map((err) => err.message);
        res.status(400).json({ message: 'Invalid user data', errors: validationErrors });
      } else if (error.name === 'MongoError' && error.code === 11000) {
        res.status(409).json({ message: 'Duplicate key error. User already exists.' });
      } else {
        res.status(500).json({ message: 'Registration failed', error: error.message });
      }
    }
  });
};

module.exports = { registerUser, authUser };
