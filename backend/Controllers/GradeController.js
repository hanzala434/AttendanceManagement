// const Grades = require('../Models/Grade');
// const User = require('../Models/User');
// const asyncHandler = require('express-async-handler');

// // Create a Grade
// const createGrade = asyncHandler(async (req, res) => {
//   const { userId, attendancePercentage, grade } = req.body;

//   if (!userId || !attendancePercentage || !grade) {
//     res.status(400);
//     throw new Error('Please add all fields');
//   }

//   const userRecord = await User.findById(userId);
//   if (!userRecord) {
//     res.status(404);
//     throw new Error('User not found');
//   }

//   const gradeRecord = await Grades.create({
//     userId,
//     attendancePercentage,
//     userName: userRecord.name, 
//     grade,
//   });

//   if (gradeRecord) {
//     res.status(201).json(gradeRecord);
//   } else {
//     res.status(400);
//     throw new Error('Invalid grade data');
//   }
// });

// // Get all Grades
// const getAllGrades = asyncHandler(async (req, res) => {
//   const grades = await Grades.find()

//   if (grades) {
//     res.status(200).json(grades);
//   } else {
//     res.status(404);
//     throw new Error('No grades found');
//   }
// });

// // Get Grade by User ID
// const getGradeByUserId = asyncHandler(async (req, res) => {
//   const { userId } = req.params;

//   const grade = await Grades.findOne({ userId })

//   if (grade) {
//     res.status(200).json(grade);
//   } else {
//     res.status(404);
//     throw new Error('Grade not found');
//   }
// });

// // Update Grade
// const updateGrade = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   const { attendancePercentage, grade } = req.body;

//   const gradeRecord = await Grades.findById(id);

//   if (!gradeRecord) {
//     res.status(404);
//     throw new Error('Grade record not found');
//   }

//   gradeRecord.attendancePercentage = attendancePercentage || gradeRecord.attendancePercentage;
//   gradeRecord.grade = grade || gradeRecord.grade;

//   const updatedGrade = await gradeRecord.save();

//   res.status(200).json(updatedGrade);
// });

// // Delete Grade
// const deleteGrade = asyncHandler(async (req, res) => {
//   const { id } = req.params;

//   const gradeRecord = await Grades.findById(id);

//   if (!gradeRecord) {
//     res.status(404);
//     throw new Error('Grade record not found');
//   }

//   await gradeRecord.remove();

//   res.status(200).json({ message: 'Grade record removed' });
// });

// module.exports = {
//   createGrade,
//   getAllGrades,
//   getGradeByUserId,
//   updateGrade,
//   deleteGrade,
// };

const Grades = require('../Models/Grade');
const Attendance = require('../Models/Attendance');
const asyncHandler = require('express-async-handler');

// Helper function to calculate grade based on percentage
const calculateGrade = (percentage) => {
  if (percentage >= 90) return 'A';
  if (percentage >= 80) return 'B';
  if (percentage >= 70) return 'C';
  if (percentage >= 60) return 'D';
  return 'F';
};

// Create or Update Grade for a User
const updateGrade = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    res.status(400);
    throw new Error('User ID is required');
  }

  const userAttendanceRecords = await Attendance.find({ user: userId });
  if (!userAttendanceRecords.length) {
    res.status(404);
    throw new Error('No attendance records found for the user');
  }

  // Calculate total attendance
  const totalDays = userAttendanceRecords.length;
  const presentDays = userAttendanceRecords.filter(record => record.status === 'Present').length;

  const attendancePercentage = (presentDays / totalDays) * 100;

  // Calculate grade based on attendance percentage
  const grade = calculateGrade(attendancePercentage);

  // Check if a grade record already exists for the user
  let gradeRecord = await Grades.findOne({ userId });

  if (gradeRecord) {
    // Update existing grade record
    gradeRecord.attendancePercentage = attendancePercentage;
    gradeRecord.grade = grade;
  } else {
    // Create new grade record
    gradeRecord = new Grades({
      userId,
      userName: userAttendanceRecords[0].userName,
      attendancePercentage,
      grade,
    });
  }

  const savedGrade = await gradeRecord.save();

  res.status(200).json(savedGrade);
});

// Get Grade by User ID
const getGradeByUser = asyncHandler(async (req, res) => {
  const userId = req.params.userId;

  const gradeRecord = await Grades.findOne({ userId });

  if (gradeRecord) {
    res.status(200).json(gradeRecord);
  } else {
    res.status(404);
    throw new Error('Grade record not found for the user');
  }
});

// Get All Grades (for Admin)
const getAllGrades = asyncHandler(async (req, res) => {
  const grades = await Grades.find();

  if (grades) {
    res.status(200).json(grades);
  } else {
    res.status(404);
    throw new Error('No grade records found');
  }
});

module.exports = {
  updateGrade,
  getGradeByUser,
  getAllGrades,
};
