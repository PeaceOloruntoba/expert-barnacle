# Loba Consulting - Node.js Backend

A Node.js/Express backend for the Loba Consulting website.

## Setup

1. Install dependencies:
```bash
cd backend/node
npm install
```

2. Start the server:
```bash
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Contact Form
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts
- `GET /api/contact/:id` - Get single contact
- `PATCH /api/contact/:id` - Update contact status
- `DELETE /api/contact/:id` - Delete contact

### Service Inquiry
- `POST /api/service` - Submit service inquiry
- `GET /api/service` - Get all service inquiries
- `GET /api/service/:id` - Get single inquiry
- `PATCH /api/service/:id` - Update inquiry status
- `DELETE /api/service/:id` - Delete inquiry

### Health Check
- `GET /api/health` - Check if server is running

## Data Storage

Data is stored in JSON files in the `data/` directory:
- `contacts.json` - Contact form submissions
- `services.json` - Service inquiries