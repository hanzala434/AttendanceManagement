const express = require('express');
const router = express.Router();
const { 
  createGrade, 
  getAllGrades, 
  getGradeByUserId, 
  updateGrade, 
  deleteGrade 
} = require('../Controllers/GradeController');

// Create a Grade
router.post('/', createGrade);

// Get all Grades
router.get('/', getAllGrades);

// Get Grade by User ID
router.get('/:userId', getGradeByUserId);

// Update Grade
router.put('/:id', updateGrade);

// Delete Grade
router.delete('/:id', deleteGrade);

module.exports = router;
