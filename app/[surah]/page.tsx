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

  if (!data) return <div className="flex justify-center items-center min-h-[40vh]"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div></div>;
  if (data.error) return <p className="p-6 text-red-500 text-center text-lg font-semibold">Error: {data.error}</p>;

  // The actual surah data is under data.data
  const surahData = data.data;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-extrabold text-blue-800 mb-4 text-center">
        {surahData.name} <span className="text-lg text-gray-500 font-normal">({surahData.englishName || surahData.englishNameTranslation || ''})</span>
      </h1>
      {surahData.ayahs && surahData.ayahs.map((ayah: any) => (
        <div key={ayah.numberInSurah} className="border border-gray-200 rounded-xl shadow bg-white p-6 mb-4 hover:shadow-lg transition">
          <p className="text-right font-semibold text-2xl text-gray-800 mb-2">{ayah.text}</p>
          <p className="mt-2 text-base text-blue-700 flex items-center gap-2">
            <span role="img" aria-label="book">📘</span> {ayah.translation || ''}
          </p>
        </div>
      ))}
    </div>
  );
}
