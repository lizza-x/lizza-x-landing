import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Todos los campos son obligatorios.' },
        { status: 400 }
      );
    }

    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Formato de correo inválido.' },
        { status: 400 }
      );
    }

    // In a real application, you would configure NodeMailer, SendGrid, Resend, etc. here.
    // For example:
    // await sendEmail({ to: 'gustavo@lizzax.com', subject: 'New Contact Form', body });
    
    // Simulate slight server processing latency for premium feel loaders
    await new Promise((resolve) => setTimeout(resolve, 800));

    console.log(`[Contact Form Submission] Name: ${name}, Email: ${email}, Message: ${message}`);

    return NextResponse.json(
      { success: true, message: 'Mensaje recibido con éxito.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact request:', error);
    return NextResponse.json(
      { error: 'Ocurrió un error inesperado al procesar tu solicitud.' },
      { status: 500 }
    );
  }
}
