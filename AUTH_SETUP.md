# Authentication Setup Guide

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-change-this-in-production

# Database (for future use with Prisma)
# DATABASE_URL="your-database-url-here"
```

## Demo Credentials

For testing purposes, you can use these demo credentials:

- **Email**: admin@example.com
- **Password**: admin123

## Features Implemented

### 1. NextAuth.js Integration
- JWT-based session management
- Credentials provider for email/password authentication
- Role-based access control (admin role required)

### 2. Authentication Pages
- **Login Page**: `/auth/login` - Sign in with email and password
- **Register Page**: `/auth/register` - Create new admin accounts

### 3. Protected Admin Routes
- All `/admin/*` routes are protected
- Server-side middleware protection
- Client-side route protection with loading states
- Automatic redirect to login for unauthenticated users

### 4. Admin Panel Features
- Session-aware user display
- Logout functionality
- Role-based access control
- Beautiful UI with loading states

## How to Use

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Access the admin panel**:
   - Go to `http://localhost:3000/admin`
   - You'll be redirected to the login page

3. **Login with demo credentials**:
   - Email: admin@example.com
   - Password: admin123

4. **Access admin features**:
   - Dashboard
   - Visa Services management
   - Tour Packages management

## Security Features

- Password hashing with bcryptjs
- JWT tokens for session management
- Server-side route protection
- Client-side authentication checks
- Role-based access control
- Secure logout with session cleanup

## Future Enhancements

- Database integration (Prisma/PostgreSQL)
- User registration API
- Password reset functionality
- Multi-factor authentication
- User management system
- Activity logging
