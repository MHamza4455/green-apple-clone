# Authentication Setup Guide

## Environment Variables

The application uses SQLite database by default. No additional environment setup is required for development.

For production, you can create a `.env.local` file with:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-change-this-in-production

# Database (optional - defaults to SQLite)
# DATABASE_URL="your-database-url-here"

# Admin Password (optional - defaults to SecureAdmin123!)
# ADMIN_PASSWORD=your-secure-password
```

## Initial Admin Credentials

After running the seed script, you can use these credentials:

- **Email**: admin@greenapple.com
- **Password**: SecureAdmin123!

**⚠️ Important**: Change the default password after first login!

## Features Implemented

### 1. NextAuth.js Integration
- JWT-based session management
- Credentials provider for email/password authentication
- Role-based access control (admin role required)

### 2. Authentication Pages
- **Login Page**: `/auth/login` - Sign in with email and password (admin access only)
- **User Management**: `/admin/users` - Create and manage users (admin only)

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

3. **Login with admin credentials**:
   - Email: admin@greenapple.com
   - Password: SecureAdmin123!

4. **Access admin features**:
   - Dashboard
   - User Management (create new users)
   - Visa Services management
   - Tour Packages management

## Security Features

- Password hashing with bcryptjs
- JWT tokens for session management
- Server-side route protection
- Client-side authentication checks
- Role-based access control
- Secure logout with session cleanup

## Admin User Management

### Creating New Users
1. Login as admin
2. Go to `/admin/users`
3. Click "Create New User"
4. Fill in user details and select role (user/admin)
5. Click "Create User"

### User Roles
- **Admin**: Full access to all features including user management
- **User**: Limited access (can be extended based on requirements)

## Future Enhancements

- Password reset functionality
- Multi-factor authentication
- User profile management
- Activity logging
- Role-based permissions system
