# Loba Consulting Backend

Flask-based REST API backend for the Loba Consulting website.

## Features

- Contact form submissions API
- Service inquiry submissions API
- SQLite database for data storage
- RESTful API endpoints
- Dashboard statistics

## Quick Start

### 1. Create virtual environment
```bash
cd backend
python -m venv venv
```

### 2. Activate virtual environment
```bash
# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate
```

### 3. Install dependencies
```bash
pip install -r requirements.txt
```

### 4. Run the server
```bash
python app.py
```

The API will be available at `http://localhost:5000`

## API Endpoints

### Contact Form
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/contact` | Submit contact form |
| GET | `/api/contacts` | Get all contacts |
| GET | `/api/contacts/<id>` | Get single contact |
| PUT | `/api/contacts/<id>` | Update contact status |
| DELETE | `/api/contacts/<id>` | Delete contact |

### Service Inquiries
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/inquiry` | Submit service inquiry |
| GET | `/api/inquiries` | Get all inquiries |

### Utilities
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/stats` | Dashboard statistics |
| GET | `/api/health` | Health check |

## Example Usage

### Submit Contact Form
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "message": "I need help with my project"
  }'
```

### Get All Contacts
```bash
curl http://localhost:5000/api/contacts
```

## Project Structure

```
backend/
├── app.py              # Main Flask application
├── models.py           # Database models
├── routes.py           # API routes
├── requirements.txt    # Python dependencies
├── .env.example        # Environment variables template
└── README.md           # This file
```

## Production Deployment

For production, use Gunicorn:
```bash
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

Update the `.env.example` file to `.env` with your actual secret key for production.