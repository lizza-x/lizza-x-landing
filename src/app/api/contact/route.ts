import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

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

    // SMTP Configuration from environment variables
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = parseInt(process.env.SMTP_PORT || '465', 10);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const emailTo = process.env.EMAIL_TO || smtpUser;

    // Fallback if environment variables are not set yet
    if (!smtpHost || !smtpUser || !smtpPass) {
      console.warn('SMTP configuration is missing in environment variables. Running in simulation mode:');
      console.log(`[Contact Form Simulation] Name: ${name}, Email: ${email}, Message: ${message}`);
      
      // Simulate slight network latency
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      return NextResponse.json(
        { success: true, message: 'Mensaje recibido (modo simulación).' },
        { status: 200 }
      );
    }

    // Create SMTP transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // true for 465 (SSL), false for other ports (e.g. 587 TLS)
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // Email options
    const mailOptions = {
      from: `"${name} via Lizza X" <${smtpUser}>`, // Zoho/SES require sender to match authenticated SMTP user
      to: emailTo,
      replyTo: email, // Direct replies will go to the sender who filled out the form
      subject: `Nuevo mensaje de contacto de ${name} (Lizza X)`,
      text: `Nombre: ${name}\nEmail: ${email}\nMensaje:\n${message}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #edf2f7; border-radius: 16px; padding: 32px; background-color: #ffffff; color: #2d3748; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          <h2 style="color: #0071e3; margin-top: 0; font-size: 1.5rem; font-weight: 800; border-bottom: 2px solid #edf2f7; padding-bottom: 16px;">
            Lizza X — Nuevo Mensaje
          </h2>
          <div style="margin-top: 24px;">
            <p style="margin: 8px 0; font-size: 0.95rem;"><strong style="color: #4a5568;">Nombre:</strong> ${name}</p>
            <p style="margin: 8px 0; font-size: 0.95rem;"><strong style="color: #4a5568;">Email:</strong> <a href="mailto:${email}" style="color: #0071e3; text-decoration: none;">${email}</a></p>
          </div>
          <div style="background-color: #f7fafc; border-radius: 12px; padding: 20px; margin-top: 24px; border: 1px solid #edf2f7;">
            <h4 style="margin-top: 0; margin-bottom: 8px; color: #4a5568; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.5px;">Mensaje:</h4>
            <p style="margin: 0; white-space: pre-wrap; line-height: 1.6; font-size: 1rem; color: #2d3748;">${message}</p>
          </div>
          <hr style="border: 0; border-top: 1px solid #edf2f7; margin: 32px 0;">
          <p style="font-size: 0.75rem; color: #a0aec0; margin-bottom: 0; text-align: center; font-family: monospace;">
            Generado automáticamente desde Lizza X Landing Page
          </p>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    console.log(`[Contact Form Success] Email sent from ${email} to ${emailTo}`);

    return NextResponse.json(
      { success: true, message: 'Mensaje enviado con éxito.' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error processing contact request:', error);
    return NextResponse.json(
      { error: 'Ocurrió un error inesperado al procesar tu solicitud. ' + (error.message || '') },
      { status: 500 }
    );
  }
}
