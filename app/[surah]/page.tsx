'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SurahPage() {
  const { surah } = useParams();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/surah/${surah}`)
      .then((r) => r.json())
      .then(setData)
      .catch(console.error);
  }, [surah]);

  if (!data)
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (data.error)
    return (
      <p className="p-6 text-red-500 text-center text-lg font-semibold">
        Error: {data.error}
      </p>
    );

  const surahData = data.data;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
      {/* Surah Title */}
      <div className="text-center mb-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-800 tracking-tight mb-2 drop-shadow-sm">
          {surahData.name}
        </h1>
        <p className="text-lg text-gray-600 font-medium">
          {surahData.englishName || surahData.englishNameTranslation || ''}
        </p>
      </div>

      {/* Ayahs */}
      {surahData.ayahs && surahData.ayahs.map((ayah: any) => (
        <div
          key={ayah.numberInSurah}
          className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 hover:shadow-lg transition"
        >
          {/* Arabic Ayah */}
          <p className="text-3xl text-gray-900 font-[Amiri] leading-relaxed text-right mb-4">
            {ayah.text}
          </p>

          {/* Translation */}
          <p className="text-base text-blue-700 flex items-start gap-2">
            <span role="img" aria-label="book">📘</span>
            <span>{ayah.translation || ''}</span>
          </p>
        </div>
      ))}
    </div>
  );
}
