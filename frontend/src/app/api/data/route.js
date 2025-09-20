import { NextResponse } from 'next/server';

export async function GET(request) {
  // Verifique o terminal onde o 'npm run dev' está rodando por mensagens de erro!
  try {
    const data = {
      message: "Dados fornecidos pelo back-end (API Route) do Next.js!",
      timestamp: new Date().toISOString()
    };

    return NextResponse.json(data);
  } catch (error) {
    console.error("Erro na API Route:", error);
    return new NextResponse(
      JSON.stringify({ error: "Erro interno no servidor" }),
      { status: 500 }
    );
  }
}