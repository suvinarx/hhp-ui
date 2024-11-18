import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        
        const { name, email, message } = body;
        
        const emailBody = `
        You have received a new message from the contact form:\n
        Name: ${name}\n
        Email: ${email}\n
        Message:\n
        ${message}\n
        --\n
        This is an automated message. Please do not reply directly to this email.
        `.trim();
        
        const response = await fetch("https://sendmail-api-docs.vercel.app/api/send", {
            method: "POST",
            body: JSON.stringify({
                to: "suvinarinc@gmail.com", 
                subject: "Message From Your E-commerce Website",
                message: emailBody,
            }),
        });



        const data = await response.json();

        if (response.ok) {
            return NextResponse.json({ success: true, data });
        } else {
            return NextResponse.json(
                { success: false, error: data },
                { status: response.status }
            );
        }
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
