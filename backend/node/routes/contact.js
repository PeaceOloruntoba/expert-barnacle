const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

// Path to JSON data file
const dataFilePath = path.join(__dirname, '../data/contacts.json');

// Ensure data directory exists
const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Helper function to read data
function readContacts() {
  try {
    if (fs.existsSync(dataFilePath)) {
      const data = fs.readFileSync(dataFilePath, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading contacts:', error);
  }
  return [];
}

// Helper function to write data
function writeContacts(contacts) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(contacts, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing contacts:', error);
    return false;
  }
}

// ==================== Contact Form Endpoints ====================

// Submit contact form
router.post('/', (req, res) => {
  const { name, email, phone, service_type, message } = req.body;
  
  // Validate required fields
  if (!name || !email || !message) {
    return res.status(400).json({ 
      success: false,
      error: 'name, email, and message are required' 
    });
  }
  
  const contacts = readContacts();
  
  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone: phone || null,
    service_type: service_type || null,
    message,
    status: 'pending',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  contacts.push(newContact);
  
  if (writeContacts(contacts)) {
    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: newContact
    });
  } else {
    res.status(500).json({ 
      success: false,
      error: 'Failed to save contact' 
    });
  }
});

// Get all contacts
router.get('/', (req, res) => {
  const contacts = readContacts();
  
  // Sort by created_at descending
  contacts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  
  res.json({
    success: true,
    data: contacts
  });
});

// Get single contact
router.get('/:id', (req, res) => {
  const contacts = readContacts();
  const contact = contacts.find(c => c.id === req.params.id);
  
  if (!contact) {
    return res.status(404).json({ 
      success: false,
      error: 'Contact not found' 
    });
  }
  
  res.json({
    success: true,
    data: contact
  });
});

// Update contact status
router.patch('/:id', (req, res) => {
  const contacts = readContacts();
  const index = contacts.findIndex(c => c.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ 
      success: false,
      error: 'Contact not found' 
    });
  }
  
  const { status } = req.body;
  if (status) {
    contacts[index].status = status;
  }
  
  contacts[index].updated_at = new Date().toISOString();
  
  if (writeContacts(contacts)) {
    res.json({
      success: true,
      message: 'Contact updated successfully',
      data: contacts[index]
    });
  } else {
    res.status(500).json({ 
      success: false,
      error: 'Failed to update contact' 
    });
  }
});

// Delete contact
router.delete('/:id', (req, res) => {
  const contacts = readContacts();
  const index = contacts.findIndex(c => c.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ 
      success: false,
      error: 'Contact not found' 
    });
  }
  
  contacts.splice(index, 1);
  
  if (writeContacts(contacts)) {
    res.json({
      success: true,
      message: 'Contact deleted successfully'
    });
  } else {
    res.status(500).json({ 
      success: false,
      error: 'Failed to delete contact' 
    });
  }
});

module.exports = router;