// app/api/alquiler/route.ts
import { google } from "googleapis";
import { NextResponse } from "next/server";

type AlquilerFormData = {
  nombre: string;
  email?: string;          // opcional, NO se escribe
  numero: string;
  dni: string;
  mensaje?: string;
  destino: string;
  fechaSalida: string;     // ISO yyyy-mm-dd
  fechaRetorno: string;    // ISO yyyy-mm-dd
  vehiculo: string;
  precio: number;
};

export async function POST(request: Request) {
  try {
    const body: AlquilerFormData = await request.json();

    // Validaciones básicas (sin exigir email)
    if (
      !body.nombre ||
      !body.numero ||
      !body.dni ||
      !body.destino ||
      !body.fechaSalida ||
      !body.fechaRetorno ||
      !body.vehiculo
    ) {
      return NextResponse.json(
        { error: "Faltan campos requeridos: nombre, destino, fechas (salida y retorno), teléfono, DNI y vehículo son obligatorios." },
        { status: 400 }
      );
    }

    // Auth Google Sheets
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    const sheets = google.sheets({ auth, version: "v4" });

    // Timestamp (Perú)
    const timestamp = new Date().toLocaleString("es-PE", {
      timeZone: "America/Lima",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    // dd/mm/yyyy (4 dígitos)
    const toDDMMYYYY = (iso: string) => {
      const d = new Date(iso);
      const dd = String(d.getDate()).padStart(2, "0");
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const yyyy = d.getFullYear();
      return `${dd}/${mm}/${yyyy}`;
    };

    // Estructura SIN columna "rango"
    // A Timestamp | B Nombre | C Teléfono | D DNI | E Destino
    // F FechaSalida | G FechaRetorno | H Mensaje | I Vehículo | J Precio
    const rowData = [
      timestamp,                          // A
      body.nombre,                        // B
      body.numero,                        // C
      body.dni,                           // D
      body.destino,                       // E
      toDDMMYYYY(body.fechaSalida),       // F
      toDDMMYYYY(body.fechaRetorno),      // G
      body.mensaje || "",                 // H
      body.vehiculo,                      // I
      `S/ ${Number(body.precio).toFixed(2)}`, // J
    ];

    // ¡OJO! 10 columnas -> A..J
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "A1:J1",
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [rowData] },
    });

    return NextResponse.json({
      message: "¡Solicitud de alquiler enviada con éxito! Nos pondremos en contacto contigo pronto.",
      data: response.data,
    });
  } catch (error) {
    console.error("Error al escribir en Google Sheets:", error);
    const errorMessage = error instanceof Error ? error.message : "Error desconocido al procesar la solicitud.";
    return NextResponse.json(
      { error: "Ocurrió un error al procesar tu solicitud.", details: errorMessage },
      { status: 500 }
    );
  }
}
