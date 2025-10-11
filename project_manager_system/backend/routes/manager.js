const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const { requireRole } = require('../middleware/roles');
const managerCtrl = require('../controllers/managerController');

router.use(authMiddleware, requireRole('manager'));

router.get('/leads', managerCtrl.listMyLeads);
router.patch('/leads/:id', managerCtrl.updateMyLead);

module.exports = router;
