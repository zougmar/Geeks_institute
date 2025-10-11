const Lead = require('../models/Lead');

exports.listMyLeads = async (req, res) => {
  const leads = await Lead.find({ managerId: req.user._id });
  res.json(leads);
};

exports.updateMyLead = async (req, res) => {
  const { id } = req.params;
  const { status, notes } = req.body;
  if(status && !['PENDING','IN_PROGRESS','COMPLETED','CANCELED'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }
  const lead = await Lead.findById(id);
  if(!lead) return res.status(404).json({ message: 'Lead not found' });
  if(!lead.managerId || lead.managerId.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not allowed to edit this lead' });
  }
  if(status) lead.status = status;
  if(notes) {
    if(Array.isArray(notes)) {
      lead.notes = lead.notes.concat(notes);
    } else if(typeof notes === 'string') {
      lead.notes.push(notes);
    }
  }
  await lead.save();
  res.json(lead);
};
