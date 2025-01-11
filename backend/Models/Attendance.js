const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  userName: { 
    type: String, 
    required: true 
  },
  date: { 
    type: Date, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['Present', 'Absent','Leave'], 
    required: true 
  },
},
{ timestamps: true });

module.exports = mongoose.model("Attendance", attendanceSchema);
