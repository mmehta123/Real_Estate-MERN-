const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
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
  avatar:{
    type:String,
    default:"https://imgs.search.brave.com/0k6KyZCa-dVlOYoTVb9Rn_l8fcmBBZWfslDrFGxdd4s/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9wcmV2/aWV3LnBpeGxyLmNv/bS9pbWFnZXMvODAw/d20vMTI1Ni8yLzEy/NTYyMDk4MzIuanBn"
  }
},
{timestamps: true,versionKey: false},
);

const User = mongoose.model("User", userSchema);
module.exports = User;
