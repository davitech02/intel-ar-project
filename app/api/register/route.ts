// app/api/register/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    // --- Server-Side Validation ---
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    // A simple check for a valid email format
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email format.' }, { status: 400 });
    }

    // A simple check for password length
    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters long.' }, { status: 400 });
    }

    // --- Simulate User Creation ---
    // In a real Flask backend, you would:
    // 1. Check if a user with this 'email' already exists in the database.
    // 2. Hash the 'password' using a library like bcrypt.
    // 3. Save the new user (name, email, hashed_password, role='client') to the 'users' table.
    // 4. Optionally, send a welcome email.

    console.log('--- NEW USER REGISTRATION ---');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password); // In a real app, NEVER log the plain password
    console.log('-----------------------------');

    // Return a success response
    return NextResponse.json({ message: 'User registered successfully! You can now log in.' }, { status: 201 });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'An unexpected server error occurred.' }, { status: 500 });
  }
}