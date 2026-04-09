# College Management System (CMS)

A production-ready web application for managing college operations, built with Node.js, Express, and MySQL.

## Features

### Admin (College)
- **Dashboard**: Real-time stats for students, attendance, fees, and complaints.
- **Student Management**: Full CRUD operations for student records.
- **Attendance**: Mark daily attendance per subject.
- **Marksheet Management**: Upload marks for students.
- **Fee Tracking**: Manage and update student fee statuses.
- **Complaints**: View and resolve student issues.

### Student
- **Dashboard**: View attendance percentage and overview.
- **Profile**: View personal academic profile.
- **Results**: Check marks and grades by subject.
- **Fees**: View pending and paid fee details.
- **Complaints**: Submit and track status of queries.

## Tech Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript, Chart.js.
- **Backend**: Node.js, Express.js.
- **Database**: MySQL.
- **Auth**: JWT (JSON Web Tokens) with bcrypt password hashing.

## Setup Instructions

### 1. Database Configuration
1. Install MySQL Server.
2. Create a database named `college_system`.
3. Import the `database/schema.sql` file into your MySQL server.
   ```bash
   mysql -u root -p college_system < database/schema.sql
   ```

### 2. Backend Configuration
1. Open `.env` file in the root directory.
2. Update the `DB_USER`, `DB_PASSWORD`, and `DB_NAME` according to your local setup.
3. Change `JWT_SECRET` to a secure string.

### 3. Install Dependencies
```bash
npm install
```

### 4. Run the Application
```bash
node server.js
```
The server will start at `http://localhost:5000`.

### 5. Login Credentials
- **Admin**: `admin@college.com` / `admin123`
- **Student**: Created via Admin dashboard.

## Project Structure
- `public/`: Static files (HTML, CSS, JS).
- `routes/`: Express API endpoints.
- `controllers/`: Business logic.
- `middleware/`: Auth and role protection.
- `config/`: Database connection.
- `database/`: SQL schema files.
- `utils/`: Common helper functions.

## Learning Highlights
- **RESTful API Design**: Clear separation between frontend and backend.
- **Role-Based Access Control (RBAC)**: Middleware to ensure correct user access.
- **Security**: SQL Injection prevention using prepared statements and JWT for session management.
- **Data Visualization**: Dynamic charts using Chart.js.
