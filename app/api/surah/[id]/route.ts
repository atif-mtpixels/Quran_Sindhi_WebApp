import { NextResponse, NextRequest } from 'next/server';

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = await params;
  const url = `https://api.alquran.cloud/v1/surah/${id}`;
  console.log('url', url);

  try {
    debugger
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch surah');
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: 'Not Found' }, { status: 404 });
  }
}
