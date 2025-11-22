// app/api/apply/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const role = formData.get('role') as string;
    const cvFile = formData.get('cv') as File;

    if (!name || !email || !role || !cvFile) {
      return NextResponse.json({ error: 'All fields, including CV, are required.' }, { status: 400 });
    }

    // --- FIX: Corrected console.log statement ---
    // The previous version had a syntax error that caused the "template literal" issue.
    console.log('--- JOB APPLICATION RECEIVED ---');
    console.log(`Notification would be sent to: recrutement@intel-ar.ca`); // This is now a clean template literal
    console.log('Applicant Name:', name);
    console.log('Applicant Email:', email);
    console.log('Applying for Role:', role);
    console.log('CV Filename:', cvFile.name);
    console.log('--------------------------------');

    return NextResponse.json({ message: 'Application submitted successfully! We will be in touch.' }, { status: 200 });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}