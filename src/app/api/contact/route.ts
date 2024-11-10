import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { name, email, message } = await request.json();

        // Input validation
        if (!name || !email || !message) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        // Send data to Formsubmit.co
        const formsubmitResponse = await fetch(`https://formsubmit.co/${process.env.FORMSUBMIT_EMAIL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                message,
            }),
        });

        if (formsubmitResponse.ok) {
            return NextResponse.json({ message: 'Message sent successfully' }, { status: 200 });
        } else {
            const errorData = await formsubmitResponse.json();
            return NextResponse.json({ error: errorData.error || 'Failed to send message' }, { status: 500 });
        }
    } catch (error) {
        console.error('Error in form submission:', error);
        return NextResponse.json({ error: 'Failed to process form submission' }, { status: 500 });
    }
}
