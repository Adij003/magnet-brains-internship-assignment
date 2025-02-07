
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')

// @desc Register a new user
// @route /api/users
// @access public

const registerUser = asyncHandler( async (req, res) => {
    const {name, email, password} = req.body
    
    const userAdmin = await User.findById(req.user.id);

    if (!userAdmin.isAdmin) {
      res.status(403);
      throw new Error('Not authorized, only Admin can register a user');
  }


    if( !name || !email || !password){
        res.status(400)
        throw new Error('Please include all fields')
    }

    // here we check if user exists or not
    const userExists = await User.findOne({ email })

    if (userExists) {
      res.status(400)
      throw new Error('User already exists')
    }



    // hashing password here
    const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

      // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new error('Invalid user data')
  }
})

const loginUser = asyncHandler( async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })
  
    // Check user and passwords match
    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      })
    } else {
      res.status(401)
      throw new Error('Invalid credentials')
    }
})

// @desc Get current user
// @route /api/users/me
// @access private

const getMe = asyncHandler( async (req, res) => {
  const user = {
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,

  }  
  res.status(200).json(user)
})

// @desc Get all users
// @route GET /api/users
// @access Private (Admin only)
const getAllUsers = asyncHandler(async (req, res) => {
  
  if (!req.user || !req.user.isAdmin) {
      res.status(403);
      throw new Error("Not authorized, only Admin can view all users");
  }

  
  const users = await User.find().select("-password");

  res.status(200).json(users);
});

// @desc Update a user (Admin only)
// @route PUT /api/users/:id
// @access Private (Admin only)
const updateUser = asyncHandler(async (req, res) => {
  // Check if the logged-in user is an admin
  if (!req.user || !req.user.isAdmin) {
      res.status(403);
      throw new Error("Not authorized, only Admin can update user details");
  }

  // Find the user by ID
  const user = await User.findById(req.params.id);

  if (!user) {
      res.status(404);
      throw new Error("User not found");
  }

  
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.isAdmin = req.body.isAdmin !== undefined ? req.body.isAdmin : user.isAdmin;

  
  const updatedUser = await user.save();

  res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
  });
});

// @desc    Get a single user by ID
// @route   GET /api/users/:id
// @access  Private (Admin only)
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password'); // Exclude password from response

  if (!user) {
      res.status(404);
      throw new Error('User not found');
  }

  res.status(200).json(user);
});


// @desc    Delete a user by ID (Admin only)
// @route   DELETE /api/users/:id
// @access  Private (Admin only)
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
      res.status(404);
      throw new Error('User not found');
  }

  await user.deleteOne(); // Delete the user

  res.status(200).json({ message: 'User deleted successfully' });
});



// Generate token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    })
  }
  
module.exports = {
    registerUser,
    loginUser,
    getMe,
    getAllUsers,
    updateUser,
    getUserById,
    deleteUser
}