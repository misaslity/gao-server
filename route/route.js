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
const get_setting_bank = require('../controller/get_setting_bank');
const deposit = require('../controller/deposit');
const withdraw = require('../controller/withdraw');
const getTransactionDeposit = require('../controller/get_transaction_deposit');
const approve_deposit = require('../controller/approve_deposit');
const reject_deposit = require('../controller/reject_deposit');
const delete_deposit = require('../controller/delete_deposit');
const approve_withdraw = require('../controller/approve_withdraw');
const reject_withdraw = require('../controller/reject_withdraw');
const delete_withdraw = require('../controller/delete_withdraw');
const getTransactionWithdraw = require('../controller/get_transaction_withdraw');
const get_all_user = require('../controller/get_all_user');
const update_user_admin = require('../controller/update_user_admin');
const delete_user_admin = require('../controller/delete_user_admin');
const update_user = require('../controller/update_user');
const delete_user = require('../controller/delete_user');
const update_user_password_admin = require('../controller/update_user_password_admin');
const update_user_balance_admin = require('../controller/update_user_balance_admin');
const get_last_session = require('../controller/get_last_session');
const get_last_user_betting = require('../controller/get_last_user_betting');
const get_history_bet = require('../controller/get_history_bet');
const update_user_bet_result = require('../controller/update_user_bet_result');
const update_user_banking = require('../controller/update_user_banking');
const get_user_banking = require('../controller/get_user_banking');
const test = require('../controller/test');
const test2 = require('../controller/test2');
const test3 = require('../controller/test3');
const test4 = require('../controller/test4');
const update_user_fund_password = require('../controller/update_user_fund_password');
const get_all_result_session = require('../controller/get_all_result_session');
const update_user_banking_admin = require('../controller/update_user_banking_admin');
const get_all_user_banking = require('../controller/get_all_user_banking');
const update_result_session = require('../controller/update_result_session');
// const { getUsers } = require('../controllers/userController');

const router = express.Router();

router.get('/session', );
router.post('/api/v1/bet', requireAuth, postbet);
router.post('/api/v1/adjust/result',requireAuth, checkAdmin, adjust_result);
router.get('/api/v1/result/current', get_current_result_session);
router.get('/api/v1/setting', requireAuth, get_setting_bank);
router.post('/api/v1/login', login);
router.post('/api/v1/register', register);
router.post('/api/v1/deposit', requireAuth, deposit);
router.put('/api/v1/user', requireAuth, update_user);
router.put('/api/v1/user/banking', requireAuth, update_user_banking);
router.get('/api/v1/user/banking', requireAuth, get_user_banking);
router.post('/api/v1/withdraw', requireAuth, withdraw);
router.get('/api/v1/profile', requireAuth, get_profile);
router.get('/api/v1/last/session', requireAuth, get_last_session);
router.get('/api/v1/user/last/betting', requireAuth, get_last_user_betting);
router.get('/api/v2/profile', requireAuth, checkAdmin, get_profile);
router.get('/api/v1/bet/current/user', requireAuth, get_current_bet_user);
router.get('/api/v2/result/bet', requireAuth, checkAdmin, get_all_result_bet);
router.get('/api/v2/result/session', requireAuth, checkAdmin, get_all_result_session);
router.put('/api/v2/bank/setting', requireAuth, checkAdmin, put_bank_setting);
router.get('/api/v2/setting', requireAuth, checkAdmin, get_setting);
router.get('/api/v2/transaction/deposit', requireAuth, checkAdmin, getTransactionDeposit);
router.put('/api/v2/deposit/approve', requireAuth, checkAdmin, approve_deposit);
router.put('/api/v2/deposit/reject', requireAuth, checkAdmin, reject_deposit);
router.delete('/api/v2/deposit', requireAuth, checkAdmin, delete_deposit);

router.get('/api/v2/transaction/withdraw', requireAuth, checkAdmin, getTransactionWithdraw);
router.put('/api/v2/withdraw/approve', requireAuth, checkAdmin, approve_withdraw);
router.put('/api/v2/withdraw/reject', requireAuth, checkAdmin, reject_withdraw);
router.delete('/api/v2/withdraw', requireAuth, checkAdmin, delete_withdraw);

router.get('/api/v2/user', requireAuth, checkAdmin, get_all_user);
router.get('/api/v2/user/banking', requireAuth, checkAdmin, get_all_user_banking);
router.put('/api/v2/user', requireAuth, checkAdmin, update_user_admin);
router.put('/api/v2/user/banking', requireAuth, checkAdmin, update_user_banking_admin);
router.put('/api/v2/user/password', requireAuth, checkAdmin, update_user_password_admin);
router.put('/api/v2/user/balance', requireAuth, checkAdmin, update_user_balance_admin);
router.put("/api/v2/session/result", requireAuth, checkAdmin, update_result_session)
router.delete('/api/v2/user', requireAuth, checkAdmin, delete_user_admin);
router.delete('/api/v1/user', requireAuth, delete_user);

router.put("/api/v1/user/bet/result", requireAuth, update_user_bet_result)
router.put("/api/v1/user/config/fund/password", requireAuth, update_user_fund_password)
router.get("/api/v1/user/history/bet", requireAuth, get_history_bet)

router.post("/api/v1/test", test)
router.post("/api/v1/test2", test2)
router.post("/api/v1/test3", test3)
router.post("/api/v1/test4", test4)

module.exports = router;