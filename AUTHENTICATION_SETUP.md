# Authentication Setup Guide

This project now includes a complete authentication system using NextAuth.js and Prisma ORM with role-based access control.

## Features

- **Role-based Authentication**: Three user roles (SUPER_ADMIN, ADMIN, USER)
- **Super Admin System**: Only super admins can create new users
- **Protected Admin Routes**: Only authenticated admin/super admin users can access admin dashboard
- **Secure Password Hashing**: Using bcryptjs for password security
- **Session Management**: JWT-based sessions with NextAuth.js

## Database Setup

The authentication system uses the following database schema:

- **User Model**: Stores user information with roles
- **Account Model**: NextAuth.js account information
- **Session Model**: NextAuth.js session management
- **VerificationToken Model**: Email verification tokens

## User Roles

1. **SUPER_ADMIN**: Can create new users and has full access
2. **ADMIN**: Can access admin dashboard but cannot create users
3. **USER**: Regular user with limited access

## Initial Super Admin Account

A super admin account has been created with the following credentials:

- **Email**: admin@radiantwaytravel.com
- **Password**: admin123
- **Role**: SUPER_ADMIN

⚠️ **Important**: Change the default password in production!

## Environment Variables

Make sure you have the following environment variables in your `.env` file:

```env
DATABASE_URL="your-database-connection-string"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-change-this-in-production"
```

## How to Use

### 1. Login

- Navigate to `/auth/login`
- Use the super admin credentials to log in
- You'll be redirected to the admin dashboard

### 2. Create New Users (Super Admin Only)

- Login as super admin
- Navigate to `/admin/users`
- Click "Create New User"
- Fill in the user details and select role
- Only super admins can create new users

### 3. Access Control

- Admin routes (`/admin/*`) are protected
- Only authenticated users with ADMIN or SUPER_ADMIN roles can access
- Regular users are redirected to the home page
- Unauthenticated users are redirected to login

## API Endpoints

### Authentication

- `POST /api/auth/signin` - User login
- `POST /api/auth/signout` - User logout

### User Management (Super Admin Only)

- `GET /api/admin/users` - Get all users
- `POST /api/admin/create-user` - Create new user

## Security Features

- Password hashing with bcryptjs
- JWT-based session management
- Role-based route protection
- Middleware-based authentication checks
- Secure session handling

## File Structure

```
src/
├── lib/
│   ├── auth.ts          # NextAuth configuration
│   └── prisma.ts        # Prisma client setup
├── middleware.ts        # Authentication middleware
├── types/
│   └── next-auth.d.ts   # NextAuth type definitions
├── app/
│   ├── api/auth/        # NextAuth API routes
│   ├── api/admin/       # Admin API routes
│   ├── auth/login/      # Login page
│   └── admin/users/     # User management page
└── components/
    ├── AdminHeader.tsx  # Updated with logout functionality
    └── AdminSidebar.tsx # Updated with user management link
```

## Next Steps

1. **Change Default Password**: Update the super admin password
2. **Add Email Verification**: Implement email verification for new users
3. **Add Password Reset**: Implement password reset functionality
4. **Add User Profile**: Create user profile management
5. **Audit Logging**: Add logging for user actions

## Troubleshooting

### Database Connection Issues

- Ensure your DATABASE_URL is correct
- Run `npx prisma db push` to sync schema
- Run `npx prisma generate` to generate client

### Authentication Issues

- Check NEXTAUTH_SECRET is set
- Verify NEXTAUTH_URL matches your domain
- Clear browser cookies and try again

### Permission Issues

- Ensure user has correct role assigned
- Check middleware configuration
- Verify session is properly established
