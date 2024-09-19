import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Contact } from '@/models/schemas';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const contact = new Contact(body);
    await contact.save();

    return NextResponse.json({ message: 'Contact form submitted successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error submitting contact form', error: (error as Error).message }, { status: 400 });
  }
}

export async function OPTIONS() {
  return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}
