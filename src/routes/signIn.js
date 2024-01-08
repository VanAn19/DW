const express = require('express');
const router = express.Router();

const signInController = require('../app/controllers/SignInController');

router.post('/', signInController.signIn);
router.get('/', signInController.index);

module.exports = router;