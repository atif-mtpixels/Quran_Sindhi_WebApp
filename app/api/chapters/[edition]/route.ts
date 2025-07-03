import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const chapters: {
      chapter: number;
      name: string;
      englishName: string;
      ayahs: number;
    }[] = [];

    // Call default Quran (Arabic) endpoint
    const res = await fetch(`https://api.alquran.cloud/v1/quran`);

    if (!res.ok) throw new Error('Failed to fetch from remote');

    const data = await res.json();

    if (!data?.data?.surahs) {
      throw new Error('Invalid data format');
    }

    for (const surah of data.data.surahs) {
      chapters.push({
        chapter: surah.number,
        name: surah.name,
        englishName: surah.englishName ?? '',
        ayahs: surah.ayahs.length,
      });
    }

    return NextResponse.json(chapters);
  } catch (error) {
    console.error('Failed to fetch chapters:', error);
    return NextResponse.json({ error: 'Not Found' }, { status: 404 });
  }
}
