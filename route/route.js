const express = require('express');
const postbet = require('../controller/bet');
const adjust_result = require('../controller/adjust_result');
const get_current_result_session = require('../controller/get_current_result_session');
const { login } = require('../controller/login');
const { register } = require('../controller/register');
const requireAuth = require('../middleware/auth');
const get_profile = require('../controller/get_profile');
const get_current_bet_user = require('../controller/get_current_bet_user');
const checkAdmin = require('../middleware/auth_admin');
const get_all_result_bet = require('../controller/get_all_result_bet');
const put_bank_setting = require('../controller/put_bank_setting');
const get_setting = require('../controller/get_setting');
// const { getUsers } = require('../controllers/userController');

const router = express.Router();

router.get('/session', );
router.post('/api/v1/bet', requireAuth, postbet);
router.post('/api/v1/adjust/result',requireAuth, checkAdmin, adjust_result);
router.get('/api/v1/result/current', get_current_result_session);
router.post('/api/v1/login', login);
router.post('/api/v1/register', register);
router.get('/api/v1/profile', requireAuth, get_profile);
router.get('/api/v2/profile', requireAuth, checkAdmin, get_profile);
router.get('/api/v1/bet/current/user', requireAuth, get_current_bet_user);
router.get('/api/v2/result/bet', requireAuth, checkAdmin, get_all_result_bet);
router.put('/api/v2/bank/setting', requireAuth, checkAdmin, put_bank_setting);
router.get('/api/v2/setting', requireAuth, checkAdmin, get_setting);

module.exports = router;