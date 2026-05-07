# API Integration Guide - Frontend & Backend Sync

## Overview

The React frontend is now configured to fetch data from the PHP/MySQL backend via REST APIs instead of using localStorage mock data. Data is automatically synchronized between phpMyAdmin and the web application.

## Architecture

```
phpMyAdmin (Database)
    ↓
PHP Backend API
    ↓
React Frontend (DataContext)
    ↓
Components (Display Data)
```

## Setup Steps

### 1. Backend Setup (Already Completed ✅)

Backend files are located in: `d:\QL học sinh\backend\`

Make sure:
- ✅ Files copied to XAMPP: `C:\users\hp\documents\xampp\htdocs\student-management-api\`
- ✅ Database created: `student_management`
- ✅ Schema imported: `database/schema.sql`
- ✅ MySQL running in XAMPP Control Panel

### 2. Frontend Setup

The following files have been created in your React project:

```
src/services/
├── api.config.ts      ← API configuration & helper
├── authApi.ts         ← Authentication API calls
├── studentApi.ts      ← Student CRUD operations
└── classApi.ts        ← Class CRUD operations

context/
└── DataContext.tsx    ← Updated to use APIs
```

### 3. Configuration

**API Base URL** is configured in `src/services/api.config.ts`:

```typescript
export const API_CONFIG = {
  BASE_URL: 'http://localhost/student-management-api/api',
  TIMEOUT: 30000,
  HEADERS: {
    'Content-Type': 'application/json',
  },
};
```

**Change if needed:**
- Local development: `http://localhost/student-management-api/api`
- Production: Update to your server URL

## How Data Sync Works

### 1. Initial Load

When app starts:
```
App loads → DataContext initializes → fetchStudents() called → API fetches from phpMyAdmin
    ↓
Frontend displays data from database
```

### 2. User Creates Student

User fills form → Calls `studentApi.createStudent()` → API saves to database → DataContext updates

### 3. User Updates Student

User edits → Calls `studentApi.updateStudent()` → API updates database → DataContext reflects change

### 4. User Deletes Student

User clicks delete → Calls `studentApi.deleteStudent()` → API deletes from database → DataContext removes

## Using the API Services

### Authentication API

```typescript
import authApi from '../services/authApi';

// Login
const loginResult = await authApi.login({
  username: 'admin',
  password: 'password'
});

if (loginResult.success) {
  authApi.setToken(loginResult.data.token);
  authApi.setUser(loginResult.data.user);
}

// Logout
await authApi.logout();
authApi.clearAuth();

// Check if logged in
const isLoggedIn = authApi.isLoggedIn();
```

### Student API

```typescript
import studentApi from '../services/studentApi';

// Get all students
const response = await studentApi.getStudents({
  page: 1,
  limit: 10,
  search: 'Nguyễn',
  class: '10A',
  status: 'active'
});

// Get single student
const student = await studentApi.getStudent(1);

// Create student
const newStudent = await studentApi.createStudent({
  name: 'Nguyễn Văn F',
  student_code: 'HS006',
  class: '10A',
  birth_date: '2008-10-15',
  gender: 'male',
  address: 'Hà Nội'
});

// Update student
const updated = await studentApi.updateStudent(1, {
  name: 'Updated Name',
  class: '10B'
});

// Delete student
await studentApi.deleteStudent(1);

// Search
const results = await studentApi.searchStudents('Nguyễn');

// Filter by class
const classStudents = await studentApi.getStudentsByClass('10A');

// Filter by status
const activeStudents = await studentApi.getStudentsByStatus('active');
```

### Class API

```typescript
import classApi from '../services/classApi';

// Get all classes
const response = await classApi.getClasses({
  page: 1,
  limit: 10,
  search: '10A'
});

// Create class
const newClass = await classApi.createClass({
  name: '12A',
  teacher_id: 2,
  status: 'active'
});

// Update class
const updated = await classApi.updateClass(1, {
  teacher_id: 3,
  status: 'active'
});

// Delete class
await classApi.deleteClass(1);

// Search
const results = await classApi.searchClasses('10A');
```

### Using DataContext in Components

```typescript
import { useData } from '../context/DataContext';

function MyComponent() {
  const { 
    students, 
    classes, 
    loading, 
    error,
    addStudent,
    updateStudent,
    deleteStudent,
    fetchStudents,
    fetchClasses
  } = useData();

  // Refresh data
  const handleRefresh = async () => {
    await fetchStudents();
    await fetchClasses();
  };

  // Add student
  const handleAddStudent = (formData) => {
    addStudent({
      id: Date.now().toString(),
      code: formData.code,
      name: formData.name,
      class: formData.class,
      // ... other fields
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {students.map(student => (
        <div key={student.id}>{student.name}</div>
      ))}
    </div>
  );
}
```

## API Endpoints Reference

### Authentication
```
POST /api/auth/login
POST /api/auth/register
POST /api/auth/logout
```

### Students
```
GET    /api/students/list?page=1&limit=10&search=&class=&status=
POST   /api/students/store
GET    /api/students/show?id=1
PUT    /api/students/update?id=1
DELETE /api/students/delete?id=1
```

### Classes
```
GET    /api/classes/list?page=1&limit=10&search=
POST   /api/classes/store
PUT    /api/classes/update?id=1
DELETE /api/classes/delete?id=1
```

## Data Flow Diagram

### Create Student Flow

```
React Form
    ↓ (studentApi.createStudent)
PHP Backend (store.php)
    ↓ (INSERT)
MySQL Database (phpMyAdmin)
    ↓ (return created student)
React DataContext (setState)
    ↓
Component re-renders with new student
```

### Read Students Flow

```
DataContext initializes
    ↓ (fetchStudents called)
PHP Backend (list.php)
    ↓ (SELECT)
MySQL Database (phpMyAdmin)
    ↓ (return students array)
React DataContext (setStudents)
    ↓
Components display students
```

### Update Student Flow

```
User edits form
    ↓ (studentApi.updateStudent)
PHP Backend (update.php)
    ↓ (UPDATE)
MySQL Database (phpMyAdmin)
    ↓ (return updated student)
React DataContext (setState)
    ↓
Component re-renders with updated data
```

### Delete Student Flow

```
User clicks delete
    ↓ (studentApi.deleteStudent)
PHP Backend (delete.php)
    ↓ (DELETE)
MySQL Database (phpMyAdmin)
    ↓ (return success)
React DataContext (setState)
    ↓
Component removes student from list
```

## Error Handling

API calls include automatic error handling:

```typescript
try {
  const response = await studentApi.getStudents();
  // Use response.data
} catch (error) {
  console.error('API Error:', error.message);
  // Error types:
  // - Network error: "Network error - Backend may not be running"
  // - Server error: HTTP error message from backend
  // - Timeout: "Request timed out"
}
```

## Troubleshooting

### Issue: "Network error - Backend may not be running"

**Solution:**
1. Check XAMPP Control Panel - Apache & MySQL must be running (green)
2. Verify backend folder is in correct location:
   ```
   C:\users\hp\documents\xampp\htdocs\student-management-api\
   ```
3. Test backend manually:
   ```
   curl http://localhost/student-management-api/api/auth/login
   ```

### Issue: "401 Unauthorized"

**Solution:**
1. User must be logged in first
2. Token must be stored in localStorage
3. Token may have expired (7 days) - login again

### Issue: Students not showing on page

**Solution:**
1. Check browser console for errors (F12)
2. Verify `loading` and `error` states in DataContext
3. Check if fallback localStorage data is being used
4. Ensure API endpoint is returning data

### Issue: CORS errors in browser console

**Solution:**
1. CORS is enabled in backend `config/cors.php`
2. For production, update CORS origin:
   ```php
   header('Access-Control-Allow-Origin: https://yourdomain.com');
   ```

### Issue: Data not persisting after refresh

**Solution:**
1. Changes are saved to database, not localStorage
2. Data automatically fetches on app start
3. Check if API is returning data
4. Verify database has the records via phpMyAdmin

## Testing the Integration

### 1. Test Login

```typescript
// In console
const result = await fetch('http://localhost/student-management-api/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username: 'admin', password: 'password' })
});
const data = await result.json();
console.log(data);
```

Expected response:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": { ... },
    "token": "eyJ0eXAi..."
  }
}
```

### 2. Test Get Students

```typescript
const token = localStorage.getItem('token');
const result = await fetch('http://localhost/student-management-api/api/students/list', {
  headers: { 'Authorization': `Bearer ${token}` }
});
const data = await result.json();
console.log(data);
```

### 3. Verify phpMyAdmin

1. Open `http://localhost/phpmyadmin/`
2. Select database `student_management`
3. Click table `students`
4. Click **Browse** tab
5. Verify data is there

## Security Notes

⚠️ **Production Checklist:**

- [ ] Change JWT secret in `backend/utils/jwt.php`
- [ ] Update API_CONFIG.BASE_URL to production domain
- [ ] Change default user passwords (admin, teacher1)
- [ ] Enable HTTPS for all API calls
- [ ] Update CORS origin to frontend domain
- [ ] Implement rate limiting
- [ ] Add request validation
- [ ] Enable error logging
- [ ] Backup database regularly
- [ ] Use environment variables for sensitive data

## Next Steps

1. ✅ Backend API created and tested
2. ✅ Frontend API services configured
3. ✅ DataContext updated to use APIs
4. **Next:** Update all page components to call APIs instead of localStorage
5. **Then:** Test all CRUD operations
6. **Finally:** Deploy to production

## Support

For issues or questions:
1. Check browser console (F12) for error messages
2. Check XAMPP log files
3. Verify backend is running: `http://localhost/student-management-api/`
4. Test API endpoints with Postman or cURL
5. Check phpMyAdmin for database records

---

**API Integration Status:** ✅ Complete & Ready for Testing
