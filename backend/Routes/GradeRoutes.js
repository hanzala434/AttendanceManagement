// const express = require('express');
// const router = express.Router();
// const { 
//   createGrade, 
//   getAllGrades, 
//   getGradeByUserId, 
//   updateGrade, 
//   deleteGrade 
// } = require('../Controllers/GradeController');

// // Create a Grade
// router.post('/', createGrade);

// // Get all Grades
// router.get('/', getAllGrades);

// // Get Grade by User ID
// router.get('/:userId', getGradeByUserId);

// // Update Grade
// router.put('/:id', updateGrade);

// // Delete Grade
// router.delete('/:id', deleteGrade);

// module.exports = router;


const express = require('express');
const { updateGrade, getGradeByUser, getAllGrades } = require('../Controllers/GradeController');
const { protect } = require('../Middleware/AuthMiddleware'); // Ensure these middlewares are set up in your project

const router = express.Router();

// Route to update or create a grade for a user
router.post('/update', protect, updateGrade);

// Route to get a grade record by user ID
router.get('/:userId', protect, getGradeByUser);

// // Route to get all grade records (admin only)
router.get('/', protect, getAllGrades);

module.exports = router;



