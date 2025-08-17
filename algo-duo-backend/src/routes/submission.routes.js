const express = require('express');
const router = express.Router();
const submissionController = require('../controllers/submission.controller');
const { protect } = require('../middleware/auth.middleware');

// All routes require authentication
router.use(protect);

router.post('/submit', submissionController.submitSolution);
router.post('/run', submissionController.runCode);
router.get('/my-submissions', submissionController.getUserSubmissions);
router.get('/:id', submissionController.getSubmission);

module.exports = router;