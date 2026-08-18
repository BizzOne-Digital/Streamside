const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

const sendNotification = async (contact) => {
  try {
    await transporter.sendMail({
      from: `"Streamside Website" <${process.env.EMAIL_FROM}>`,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: `New Bookkeeping Inquiry from ${contact.name}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:#1F3A5F;padding:20px;text-align:center;">
            <h2 style="color:#fff;margin:0;">New Contact Inquiry</h2>
            <p style="color:#a0c4ff;margin:5px 0;">Streamside Bookkeeping</p>
          </div>
          <div style="padding:30px;background:#f7fafc;">
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:8px;font-weight:bold;color:#1F3A5F;width:35%;">Name:</td><td style="padding:8px;">${contact.name}</td></tr>
              <tr style="background:#fff;"><td style="padding:8px;font-weight:bold;color:#1F3A5F;">Business:</td><td style="padding:8px;">${contact.businessName || 'Not provided'}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;color:#1F3A5F;">Email:</td><td style="padding:8px;"><a href="mailto:${contact.email}">${contact.email}</a></td></tr>
              <tr style="background:#fff;"><td style="padding:8px;font-weight:bold;color:#1F3A5F;">Phone:</td><td style="padding:8px;">${contact.phone || 'Not provided'}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;color:#1F3A5F;">Business Type:</td><td style="padding:8px;">${contact.businessType || 'Not specified'}</td></tr>
              <tr style="background:#fff;"><td style="padding:8px;font-weight:bold;color:#1F3A5F;">Preferred Contact:</td><td style="padding:8px;">${contact.preferredContact}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;color:#1F3A5F;">Help Needed:</td><td style="padding:8px;">${contact.helpNeeded}</td></tr>
              ${contact.additionalInfo ? `<tr style="background:#fff;"><td style="padding:8px;font-weight:bold;color:#1F3A5F;">Additional Info:</td><td style="padding:8px;">${contact.additionalInfo}</td></tr>` : ''}
            </table>
          </div>
          <div style="background:#2F855A;padding:15px;text-align:center;">
            <a href="${process.env.ADMIN_URL || 'http://localhost:3000/admin'}" style="color:#fff;text-decoration:none;font-weight:bold;">View in Admin Panel →</a>
          </div>
        </div>
      `
    });
  } catch (err) {
    console.error('Email notification failed:', err.message);
  }
};

const sendAutoReply = async (contact) => {
  try {
    await transporter.sendMail({
      from: `"Wendy Stevens | Streamside Bookkeeping" <${process.env.EMAIL_FROM}>`,
      to: contact.email,
      subject: `Thanks for reaching out, ${contact.name.split(' ')[0]}!`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:#1F3A5F;padding:30px;text-align:center;">
            <h1 style="color:#fff;margin:0;font-size:24px;">Streamside Bookkeeping</h1>
            <p style="color:#90cdf4;margin:5px 0;font-style:italic;">Grow with the Flow</p>
          </div>
          <div style="padding:30px;">
            <p>Hi ${contact.name.split(' ')[0]},</p>
            <p>Thank you for reaching out to Streamside Bookkeeping. I've received your message and will be in touch within 1–2 business days.</p>
            <p>In the meantime, feel free to explore our <a href="https://streamsidebookkeeping.ca/services" style="color:#2F855A;">service plans</a> or <a href="https://streamsidebookkeeping.ca/resources" style="color:#2F855A;">free resources</a>.</p>
            <p style="margin-top:30px;">Looking forward to connecting,</p>
            <p><strong>Wendy Stevens</strong><br>Streamside Bookkeeping<br>Vancouver Island, BC<br><a href="tel:2508896907" style="color:#2F855A;">250-889-6907</a></p>
          </div>
          <div style="background:#f7fafc;padding:15px;text-align:center;font-size:12px;color:#718096;">
            <p>Please do not reply to this email with sensitive financial information.<br>Streamside Bookkeeping uses a secure process for exchanging documents.</p>
          </div>
        </div>
      `
    });
  } catch (err) {
    console.error('Auto-reply failed:', err.message);
  }
};

// POST /api/contacts — Public
exports.createContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    sendNotification(contact);
    sendAutoReply(contact);
    res.status(201).json({ success: true, message: 'Message sent successfully', id: contact._id });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// GET /api/contacts — Admin
exports.getContacts = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = status ? { status } : {};
    const total = await Contact.countDocuments(filter);
    const contacts = await Contact.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(Number(limit));
    res.json({ success: true, contacts, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/contacts/:id — Admin
exports.getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ success: false, message: 'Contact not found' });
    res.json({ success: true, contact });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/contacts/:id — Admin
exports.updateContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!contact) return res.status(404).json({ success: false, message: 'Contact not found' });
    res.json({ success: true, contact });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /api/contacts/:id — Admin
exports.deleteContact = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Contact deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
