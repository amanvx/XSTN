# API Documentation

> Complete API reference for XSTN backend integration

## 📋 Table of Contents

- [Overview](#overview)
- [Base Configuration](#base-configuration)
- [Authentication](#authentication)
- [Response Format](#response-format)
- [Data Endpoints](#data-endpoints)
- [Mutation Endpoints](#mutation-endpoints)
- [Error Handling](#error-handling)
- [Mock Data](#mock-data)

## Overview

All API interactions are handled through `src/services/api.js`. The service uses Axios for HTTP requests with automatic timeout handling and mock data fallback.

## Base Configuration

### Environment Setup

```bash
# .env
VITE_API_URL=http://localhost:5000
```

### Default Configuration

```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds
})
```

## Authentication

**Current Status**: No authentication implemented.

**Planned**: JWT token-based authentication
- Login/register endpoints
- Token storage in localStorage
- Automatic token injection in headers
- Token refresh mechanism

## Response Format

All API methods return a standardized response:

```typescript
{
  success: boolean,
  data?: any,
  error?: string
}
```

### Success Response

```json
{
  "success": true,
  "data": {
    // Response payload
  }
}
```

### Error Response

```json
{
  "success": false,
  "error": "Error message description"
}
```

## Data Endpoints

### Get All Projects

**Endpoint**: `GET /api/projects`

**Description**: Fetch all projects with categories, status, tech stack, and metadata.

**Request**:
```javascript
const response = await api.getProjects()
```

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "FinTech Dashboard",
      "category": "FinTech",
      "status": "Live",
      "year": 2024,
      "desc": "Real-time trading analytics",
      "color": "var(--neon-blue)",
      "client": "TradeLabs",
      "duration": "4mo",
      "team": 5,
      "tags": ["React", "Node.js", "WebSocket"]
    }
  ]
}
```

**Mock Data**: Returns 3 sample projects (FinTech, HealthTech, EdTech)

---

### Get Project by ID

**Endpoint**: `GET /api/projects/:id`

**Description**: Fetch single project details by ID.

**Request**:
```javascript
const response = await api.getProjectById(1)
```

**Response**: Same structure as single project object above.

**Mock Data**: Returns `{ id, title: "Project {id}" }`

---

### Get All Services

**Endpoint**: `GET /api/services`

**Description**: Fetch all service offerings with full descriptions, tech stacks, and features.

**Request**:
```javascript
const response = await api.getServices()
```

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "icon": "🌐",
      "title": "Web Development",
      "shortDesc": "Scalable, responsive web apps",
      "fullDesc": "Full-stack web solutions using React, Next.js...",
      "color": "var(--neon-blue)",
      "stack": "React · Next.js · Node.js · PostgreSQL",
      "features": [
        "Responsive Design",
        "API Development",
        "Database Design",
        "Cloud Deployment"
      ]
    }
  ]
}
```

**Mock Data**: Returns 4 services (Web Dev, Mobile, AI/ML, UI/UX)

---

### Get Team Members

**Endpoint**: `GET /api/team`

**Description**: Fetch all team members with roles, bios, and social links.

**Request**:
```javascript
const response = await api.getTeam()
```

**Expected Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "role": "Full Stack Developer",
      "bio": "Passionate about building scalable systems",
      "avatar": "https://...",
      "github": "https://github.com/johndoe",
      "linkedin": "https://linkedin.com/in/johndoe"
    }
  ]
}
```

**Mock Data**: Returns empty array `[]`

---

### Get Statistics

**Endpoint**: `GET /api/stats`

**Description**: Fetch company statistics (projects, clients, years, team size).

**Request**:
```javascript
const response = await api.getStats()
```

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "value": "50+",
      "label": "Projects Delivered",
      "color": "var(--neon-blue)"
    },
    {
      "value": "30+",
      "label": "Happy Clients",
      "color": "var(--neon-purple)"
    }
  ]
}
```

**Mock Data**: Returns 4 stats (50+ projects, 30+ clients, 5+ years, 100+ team)

---

## Mutation Endpoints

### Submit Developer Application

**Endpoint**: `POST /api/apply-developer`

**Description**: Submit developer application form (JoinPage).

**Request**:
```javascript
const formData = {
  name: "John Doe",
  email: "john@example.com",
  college: "University Name",
  role: "Full Stack Developer",
  skills: "React, Node.js, Python",
  github: "https://github.com/johndoe",
  linkedin: "https://linkedin.com/in/johndoe",
  message: "I'm passionate about building..."
}

const response = await api.submitDeveloperApplication(formData)
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "DEV-1739312345678",
    "status": "received",
    "message": "Application received! We'll review within 3-5 days."
  }
}
```

**Mock Data**: Returns `{ id: "DEV-{timestamp}" }`

---

### Submit Contact Inquiry

**Endpoint**: `POST /api/contact-inquiry`

**Description**: Submit project inquiry/contact form.

**Request**:
```javascript
const formData = {
  name: "Jane Smith",
  email: "jane@example.com",
  company: "Acme Corp",
  service: "Web Development",
  budget: "₹2L-₹5L",
  message: "We need a web app for..."
}

const response = await api.submitContactInquiry(formData)
```

**Response**:
```json
{
  "success": true,
  "data": {
    "ticketId": "TKT-1739312345678",
    "estimatedResponse": "24-48 hours",
    "message": "Inquiry received! We'll contact you shortly."
  }
}
```

**Mock Data**: Returns `{ ticketId: "TKT-{timestamp}" }`

---

### Submit Partnership Request

**Endpoint**: `POST /api/partnership-request`

**Description**: Submit partnership inquiry (PartnerPage).

**Request**:
```javascript
const formData = {
  company: "Tech Startup Inc",
  name: "Alex Johnson",
  email: "alex@techstartup.com",
  website: "https://techstartup.com",
  type: "Tech Partner",
  details: "We'd like to collaborate on..."
}

const response = await api.submitPartnershipRequest(formData)
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "PRT-1739312345678",
    "status": "pending_review",
    "message": "Partnership request received!"
  }
}
```

**Mock Data**: Returns `{ id: "PRT-{timestamp}" }`

---

### Subscribe to Newsletter

**Endpoint**: `POST /api/newsletter-subscribe`

**Description**: Subscribe email to newsletter.

**Request**:
```javascript
const response = await api.subscribeNewsletter("user@example.com")
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "SUB-1739312345678",
    "email": "user@example.com",
    "message": "Successfully subscribed!"
  }
}
```

**Mock Data**: Returns `{ id: "SUB-{timestamp}" }`

---

## Error Handling

### Network Errors

When API calls fail (backend down, timeout, network error), the service catches the error and returns mock data:

```javascript
try {
  const { data } = await apiClient.get('/api/projects')
  return mockResponse(data || [])
} catch (err) {
  // Returns mock data instead of throwing
  return mockResponse([/* sample projects */])
}
```

### Timeout

All requests have a 10-second timeout. If exceeded:
- Request aborts
- Falls back to mock data
- No error thrown to user (seamless fallback)

### Validation Errors

Backend should return validation errors in this format:

```json
{
  "success": false,
  "error": "Validation failed: Email is invalid"
}
```

Frontend displays this in `ErrorState` component.

---

## Mock Data

### Purpose

Mock data allows frontend development and demos without backend dependency.

### When Used

- Backend not running (connection refused)
- Timeout exceeded (10+ seconds)
- Network errors

### Disabling Mock Fallback

To see actual errors instead of mock data, modify `api.js`:

```javascript
// Remove try-catch fallback
export const api = {
  getProjects: async () => {
    const { data } = await apiClient.get('/api/projects')
    return mockResponse(data)
    // No catch block = actual errors surface
  }
}
```

---

## Testing API Integration

### With Backend

1. Start backend server on port 5000
2. Set `VITE_API_URL=http://localhost:5000` in `.env`
3. Run frontend: `npm run dev`
4. Check browser console for successful API calls

### Without Backend (Mock Mode)

1. Don't start backend
2. Run frontend: `npm run dev`
3. Console will show `ERR_CONNECTION_REFUSED` (expected)
4. App displays mock data seamlessly

### Testing POST Requests

```javascript
// In browser console
const formData = {
  name: "Test User",
  email: "test@example.com",
  message: "Test message"
}

const response = await api.submitContactInquiry(formData)
console.log(response)
// { success: true, data: { ticketId: "TKT-..." } }
```

---

## Backend Implementation Guide

### Tech Stack Recommendations

- **Node.js** + **Express** - API server
- **PostgreSQL** / **MongoDB** - Database
- **JWT** - Authentication
- **Nodemailer** - Email notifications
- **Joi** / **Yup** - Validation

### Minimal Backend Example

```javascript
// server.js (Express)
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

// Projects endpoint
app.get('/api/projects', async (req, res) => {
  // Fetch from database
  const projects = await db.query('SELECT * FROM projects')
  res.json({ success: true, data: projects })
})

// Contact form endpoint
app.post('/api/contact-inquiry', async (req, res) => {
  const { name, email, message } = req.body
  
  // Validate
  if (!name || !email || !message) {
    return res.json({ 
      success: false, 
      error: 'All fields required' 
    })
  }
  
  // Save to database
  const ticket = await db.query(
    'INSERT INTO inquiries (name, email, message) VALUES ($1, $2, $3) RETURNING id',
    [name, email, message]
  )
  
  // Send email notification
  await sendEmail({
    to: 'contact@xstn.tech',
    subject: 'New Contact Inquiry',
    text: `From: ${name} <${email}>\n\n${message}`
  })
  
  res.json({ 
    success: true, 
    data: { ticketId: `TKT-${ticket.id}` }
  })
})

app.listen(5000, () => console.log('API running on :5000'))
```

---

## Rate Limiting

**Recommended**: Implement rate limiting on backend to prevent abuse.

```javascript
const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
})

app.use('/api/', limiter)
```

---

## CORS Configuration

Allow frontend origin:

```javascript
const cors = require('cors')

app.use(cors({
  origin: ['http://localhost:3000', 'https://xstn.tech'],
  credentials: true
}))
```

---

**Last Updated**: February 2026  
**API Version**: 1.0.0
