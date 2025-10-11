const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const { requireRole } = require('../middleware/roles');
const employerCtrl = require('../controllers/employerController');

router.use(authMiddleware, requireRole('employer'));

// dashboard
router.get('/dashboard-stats', employerCtrl.dashboardStats);

// managers
router.get('/managers', employerCtrl.listManagers);
router.post('/managers', employerCtrl.createManager);
router.put('/managers/:managerId', employerCtrl.updateManager);
router.delete('/managers/:managerId', employerCtrl.deleteManager);

// leads
router.get('/leads', employerCtrl.listLeads);
router.post('/leads', employerCtrl.createLead);
router.put('/leads/:leadId', employerCtrl.updateLead);
router.delete('/leads/:leadId', employerCtrl.deleteLead);

module.exports = router;
