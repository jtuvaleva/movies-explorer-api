const router = require('express').Router();

const { getCurrentUser, updateProfile } = require('../controllers/users');
const { validateUpdateProfileEntry } = require('../middlewares/validation');

router.get('/me', getCurrentUser);

router.patch('/me', validateUpdateProfileEntry, updateProfile);

module.exports = router;
