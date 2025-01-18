const mongoose=require('mongoose')


const gradesSchema = new mongoose.Schema({
    userId: 
    { type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true },
    userName: { 
      type: String, 
      required: true 
    },
    attendancePercentage: 
    { type: Number, 
      required: true },
    grade: 
    { type: String, 
      required: true },
  });
  
  const Grades = mongoose.model('Grades', gradesSchema);
  
  module.exports = Grades;
  