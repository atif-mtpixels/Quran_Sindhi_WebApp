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

  if (!data) return <p className="p-6">Loading...</p>;
  if (data.error) return <p className="p-6 text-red-500"  >Error: {data.error}</p>;
console.log("data",data)
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-2">{data.name} ({data.englishName})</h1>
      {data && data.data && data.data.ayahs.map((ayah: any) => (
        <div key={ayah.numberInSurah} className="border p-4 rounded-md shadow-sm bg-white">
          <p className="text-right font-semibold text-xl">{ayah.text}</p>
          <p className="mt-2 text-sm text-gray-600">📘 {ayah.translation}</p>
        </div>
      ))}
    </div>
  );
}
