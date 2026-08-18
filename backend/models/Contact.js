const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  businessName: { type: String, trim: true },
  email: { type: String, required: true, lowercase: true },
  phone: { type: String },
  businessType: { type: String },
  helpNeeded: { type: String, required: true },
  preferredContact: { type: String, enum: ['email', 'phone'], default: 'email' },
  additionalInfo: { type: String },
  status: { 
    type: String, 
    enum: ['new', 'contacted', 'qualified', 'converted', 'closed'], 
    default: 'new' 
  },
  notes: { type: String },
  source: { type: String, default: 'website' },
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);
