// app/api/contacto/route.ts
import { google } from 'googleapis';
import { NextResponse } from 'next/server';

type ContactoFormData = {
  nombre: string;
  email: string;
  numero: string;
  dniCde: string;
  mensaje: string;
};

export async function POST(request: Request) {
  try {
    const body: ContactoFormData = await request.json();

    // Validaciones básicas
    if (!body.nombre || !body.email || !body.numero) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos: nombre, email y número son obligatorios.' },
        { status: 400 }
      );
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'El formato del email no es válido.' },
        { status: 400 }
      );
    }

    // Autenticación con Google Sheets
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({
      auth,
      version: 'v4',
    });

    // Timestamp en hora de Perú
    const timestamp = new Date().toLocaleString('es-PE', {
      timeZone: 'America/Lima',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    // Preparar datos para la fila
    const rowData = [
      timestamp,
      body.nombre,
      body.email,
      body.numero,
      body.dniCde || '',
      body.mensaje || '',
      'Formulario de Contacto' // Tipo de formulario
    ];

    // Añadir nueva fila a la hoja de cálculo
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'A1:G1', // Rango para autodetectar
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [rowData],
      },
    });

    console.log('Datos de contacto guardados en Google Sheets:', response.data);

    return NextResponse.json({
      message: '¡Formulario de contacto enviado con éxito! Nos pondremos en contacto contigo pronto.',
      data: response.data,
    });

  } catch (error) {
    console.error('Error al escribir en Google Sheets:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido al procesar la solicitud.';
    
    return NextResponse.json(
      { 
        error: 'Ocurrió un error al procesar tu solicitud.',
        details: errorMessage 
      },
      { status: 500 }
    );
  }
}