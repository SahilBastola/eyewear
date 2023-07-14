const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Model for user login
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    pic: {
      type: String,
      required: false,
      default:
        "https://th.bing.com/th/id/R.88a6a68e235ccdb2e12f9573a296492d?rik=%2f8ojC8JRbK0mxQ&riu=http%3a%2f%2fclipground.com%2fimages%2fuser-icon-png-free-2.jpg&ehk=F%2fbwK6CA3%2bXvYOQmRwhQCMDldyyq6QIs0g5wf2hlfoU%3d&risl=&pid=ImgRaw&r=0",
    },
    isAdmin: {
      type: String,
      required: true,
      default: "false",
    },
  },
  {
    timestamps: true,
  }
);

// Encrypting password


module.exports = mongoose.model("User", userSchema);
