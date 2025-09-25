# Recruitment Platform Prototype Documentation

## 1. Overview

This project is a simple recruitment platform prototype built with:

- **Backend:** Node.js + Express + MongoDB (Mongoose)
- **Frontend:** React (Vite)
- **Authentication:** JWT
- **Styling:** CSS modules or global CSS
- **Purpose:** Users can register, login, and view/update their profile.

---

## 2. API Structure and Design Decisions

The API follows RESTful principles with clear separation of concerns:

### Base URL

http://localhost:4000/

### Endpoints

| Method | Route          | Description                     | Access    |
| ------ | -------------- | ------------------------------- | --------- |
| POST   | /auth/register | Register a new user             | Public    |
| POST   | /auth/login    | Authenticate a user             | Public    |
| GET    | /users/profile | Get logged-in user's profile    | Protected |
| PATCH  | /users/profile | Update logged-in user's profile | Protected |

**Design Decisions:**

- **Separation of routes:** `auth.routes.js` handles authentication, `user.routes.js` handles user profile.
- **Middleware usage:** `auth.js` protects routes; `error.js` centralizes error handling.
- **Stateless backend:** JWT used for authentication, allowing horizontal scaling.
- **Data validation:** Mongoose schema ensures required fields and unique emails.

---

## 3. Authentication Flow & Security

1. **Registration:**

   - Client calls `POST /auth/register`.
   - Backend hashes password using `bcrypt` before saving.
   - Server returns a JWT and user info.

2. **Login:**

   - Client calls `POST /auth/login`.
   - Backend compares password hash with entered password.
   - On success, JWT is returned.

3. **Protected Routes:**
   - JWT sent in `Authorization` header: `Bearer <token>`.
   - `auth` middleware verifies the token and attaches `req.user`.
   - If invalid, returns `401 Unauthorized`.

**Security Measures:**

- Passwords stored hashed with bcrypt (never plain text).
- JWT secret stored in `.env` and tokens expire (`JWT_EXPIRES_IN`).
- Recommended: use HTTPS in production.
- Optionally, store JWT in httpOnly cookies to prevent XSS.
- Input validation on server to prevent malformed data.

---

## 4. Error Management

All errors are handled by centralized error middleware:

**Format:**

```json
{
  "success": false,
  "message": "Error description"
}

```
## 5. responces

**registration responces**
```json

{
"message": "User registered successfully",
"user": {
"\_id": "68d5a008f2a5cbcb2ef06064",
"name": "James Flores",
"email": "fusuvu@mailinator.com"
},
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZDVhMDA4ZjJhNWNiY2IyZWYwNjA2NCIsImlhdCI6MTc1ODgzMDYwMCwiZXhwIjoxNzU4ODM0MjAwfQ.MDMkg03R6LObkv2Tat1os1pQip11JjXNJd5J99Sz_Qg"
}
```

**Login responces** 

```json
{
    "message": "Login successful",
    "user": {
        "_id": "68d5a008f2a5cbcb2ef06064",
        "name": "James Flores",
        "email": "fusuvu@mailinator.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZDVhMDA4ZjJhNWNiY2IyZWYwNjA2NCIsImlhdCI6MTc1ODgzMDYyOCwiZXhwIjoxNzU4ODM0MjI4fQ.IUQym1w888KMjRBm1yD_d6cPeH3f65a-4qO9bH9XSkQ"
}

```

## 5. Suggestions for Scaling

**Authentication & Security:**

- Use short-lived JWTs + refresh tokens stored in httpOnly cookies.
- Enforce HTTPS for all requests.
- Implement rate limiting and brute-force protection on login.

**Backend Scalability:**

- Stateless JWT-based backend allows horizontal scaling.
- Containerize with Docker and deploy using Kubernetes.

**Database:**

- Move to a managed database like MongoDB Atlas for high availability.
- Add indexes on frequently queried fields (e.g., email).

**Performance:**

- Cache frequently accessed data (e.g., profile info) using Redis.
- Optimize MongoDB queries and use connection pooling.

**Monitoring & Maintenance:**

- Add logging with Winston or Morgan and implement centralized monitoring using Prometheus/Grafana.
- Implement automated tests and CI/CD pipelines.

