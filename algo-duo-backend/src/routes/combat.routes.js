const express = require('express');
const router = express.Router();
const combatController = require('../controllers/combat.controller');
const { verifyFirebaseToken } = require('../middleware/firebaseAuth.middleware');

// All combat routes require Firebase auth
router.get('/match/:matchId', verifyFirebaseToken, combatController.getMatch);
router.get('/history/:userId', verifyFirebaseToken, combatController.getHistory);
router.get('/problems', verifyFirebaseToken, combatController.getProblems);
router.post('/problems', verifyFirebaseToken, combatController.addProblem);
router.post('/submit', verifyFirebaseToken, combatController.submitCode);

module.exports = router;
