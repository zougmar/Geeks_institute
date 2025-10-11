const User = require('../models/User');
const Lead = require('../models/Lead');
const mongoose = require('mongoose');

exports.dashboardStats = async (req, res) => {
  const totalInProgress = await Lead.countDocuments({ status: { $in: ['PENDING','IN_PROGRESS'] } });
  const totalCompleted = await Lead.countDocuments({ status: 'COMPLETED' });
  const totalCanceled = await Lead.countDocuments({ status: 'CANCELED' });
  res.json({
    inProgress: totalInProgress,
    completed: totalCompleted,
    canceled: totalCanceled
  });
};

exports.listManagers = async (req, res) => {
  const managers = await User.find({ role: 'manager' }).select('-password');
  res.json(managers);
};

exports.createManager = async (req, res) => {
  const { name, email, password, phone, image } = req.body;
  if(!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });

  const exists = await User.findOne({ email });
  if(exists) return res.status(400).json({ message: 'Email already used' });

  const manager = await User.create({ name, email, password, phone, image, role: 'manager' });

  res.status(201).json({ 
    id: manager._id, 
    name: manager.name, 
    email: manager.email,
    phone: manager.phone,
    image: manager.image
  });
};



exports.updateManager = async (req, res) => {
  const { managerId } = req.params;
  const { name, email, password, phone, image } = req.body;

  const update = {};
  if(name) update.name = name;
  if(email) update.email = email;
  if(password) update.password = password;
  if(phone) update.phone = phone;
  if(image) update.image = image;

  const manager = await User.findById(managerId);
  if(!manager || manager.role !== 'manager') return res.status(404).json({ message: 'Manager not found' });

  Object.assign(manager, update);
  await manager.save();

  res.json({ 
    id: manager._id, 
    name: manager.name, 
    email: manager.email,
    phone: manager.phone,
    image: manager.image
  });
};


exports.deleteManager = async (req, res) => {
  const { managerId } = req.params;
  const manager = await User.findById(managerId);
  if(!manager || manager.role !== 'manager') return res.status(404).json({ message: 'Manager not found' });
  // Optionally unassign leads before deletion
  await Lead.updateMany({ managerId: manager._id }, { $set: { managerId: null } });
  await manager.remove();
  res.json({ message: 'Manager deleted' });
};

exports.listLeads = async (req, res) => {
  const filter = {};
  const { managerId, status } = req.query;
  if(managerId && mongoose.Types.ObjectId.isValid(managerId)) filter.managerId = managerId;
  if(status) filter.status = status;
  const leads = await Lead.find(filter).populate('managerId', 'name email');
  res.json(leads);
};

exports.createLead = async (req, res) => {
  const { contactName, contactEmail, companyName, status, managerId } = req.body;
  if(!contactName || !contactEmail) return res.status(400).json({ message: 'Missing required fields' });
  const leadData = { contactName, contactEmail, companyName };
  if(status) leadData.status = status;
  if(managerId) leadData.managerId = managerId;
  const lead = await Lead.create(leadData);
  res.status(201).json(lead);
};

exports.updateLead = async (req, res) => {
  const { leadId } = req.params;
  const update = req.body;
  if(update.status && !['PENDING','IN_PROGRESS','COMPLETED','CANCELED'].includes(update.status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }
  const lead = await Lead.findByIdAndUpdate(leadId, update, { new: true });
  if(!lead) return res.status(404).json({ message: 'Lead not found' });
  res.json(lead);
};

exports.deleteLead = async (req, res) => {
  const { leadId } = req.params;
  const lead = await Lead.findByIdAndDelete(leadId);
  if(!lead) return res.status(404).json({ message: 'Lead not found' });
  res.json({ message: 'Lead deleted' });
};
