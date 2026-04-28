const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

// Path to JSON data file
const dataFilePath = path.join(__dirname, '../data/services.json');

// Ensure data directory exists
const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Helper function to read data
function readServices() {
  try {
    if (fs.existsSync(dataFilePath)) {
      const data = fs.readFileSync(dataFilePath, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading services:', error);
  }
  return [];
}

// Helper function to write data
function writeServices(services) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(services, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing services:', error);
    return false;
  }
}

// ==================== Service Inquiry Endpoints ====================

// Submit service inquiry
router.post('/', (req, res) => {
  const { 
    service_name, 
    client_name, 
    client_email, 
    client_phone, 
    project_details, 
    budget_range, 
    deadline 
  } = req.body;
  
  // Validate required fields
  if (!service_name || !client_name || !client_email) {
    return res.status(400).json({ 
      success: false,
      error: 'service_name, client_name, and client_email are required' 
    });
  }
  
  const services = readServices();
  
  const newService = {
    id: uuidv4(),
    service_name,
    client_name,
    client_email,
    client_phone: client_phone || null,
    project_details: project_details || null,
    budget_range: budget_range || null,
    deadline: deadline || null,
    status: 'new',
    created_at: new Date().toISOString()
  };
  
  services.push(newService);
  
  if (writeServices(services)) {
    res.status(201).json({
      success: true,
      message: 'Service inquiry submitted successfully',
      data: newService
    });
  } else {
    res.status(500).json({ 
      success: false,
      error: 'Failed to save service inquiry' 
    });
  }
});

// Get all service inquiries
router.get('/', (req, res) => {
  const services = readServices();
  
  // Sort by created_at descending
  services.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  
  res.json({
    success: true,
    data: services
  });
});

// Get single service inquiry
router.get('/:id', (req, res) => {
  const services = readServices();
  const service = services.find(s => s.id === req.params.id);
  
  if (!service) {
    return res.status(404).json({ 
      success: false,
      error: 'Service inquiry not found' 
    });
  }
  
  res.json({
    success: true,
    data: service
  });
});

// Update service inquiry status
router.patch('/:id', (req, res) => {
  const services = readServices();
  const index = services.findIndex(s => s.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ 
      success: false,
      error: 'Service inquiry not found' 
    });
  }
  
  const { status } = req.body;
  if (status) {
    services[index].status = status;
  }
  
  if (writeServices(services)) {
    res.json({
      success: true,
      message: 'Service inquiry updated successfully',
      data: services[index]
    });
  } else {
    res.status(500).json({ 
      success: false,
      error: 'Failed to update service inquiry' 
    });
  }
});

// Delete service inquiry
router.delete('/:id', (req, res) => {
  const services = readServices();
  const index = services.findIndex(s => s.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ 
      success: false,
      error: 'Service inquiry not found' 
    });
  }
  
  services.splice(index, 1);
  
  if (writeServices(services)) {
    res.json({
      success: true,
      message: 'Service inquiry deleted successfully'
    });
  } else {
    res.status(500).json({ 
      success: false,
      error: 'Failed to delete service inquiry' 
    });
  }
});

module.exports = router;