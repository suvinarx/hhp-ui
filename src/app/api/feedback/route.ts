import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Feedback } from '@/models/schemas';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const feedback = new Feedback(body);
    await feedback.save();

    return NextResponse.json({ message: 'Feedback submitted successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error submitting feedback', error: (error as Error).message }, { status: 400 });
  }
}

export async function OPTIONS() {
  return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}
