'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

type Chapter = {
  chapter: number;
  englishName: string;
  name: string;
  ayahs: number;
};

const editions = [
  { value: 'en.asad', label: 'English (Asad)' },
  { value: 'ur.jalandhry', label: 'Urdu (Jalandhry)' },
  { value: 'sd-ghulamrasoolmehar', label: 'Sindhi (Ghulam Rasool Mehar)' },
];

export default function Home() {
  const [selectedEdition, setSelectedEdition] = useState('sd-ghulamrasoolmehar');
  const [chapters, setChapters] = useState<Chapter[]>([]);

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const res = await fetch(`/api/chapters/${selectedEdition}`);
        const data = await res.json();
        if (res.ok) {
          setChapters(data.chapters || data); // handle both cases
        } else {
          console.error('Error fetching:', data);
          setChapters([]);
        }
      } catch (err) {
        console.error('Error:', err);
        setChapters([]);
      }
    };

    fetchChapters();
  }, [selectedEdition]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-gray-100 p-600 md:p-100">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex flex-col sm:flex-row  sm:items-center justify-center gap-4">
          <h1 className="text-3xl font-bold text-gray-800">📖 Quran Chapters</h1>

        </div>

        {chapters.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {chapters.map((s) => (
              <Link
                key={s.chapter}
                href={`/${s.chapter}`}
                className="block bg-white border border-gray-200 rounded-xl p-5 shadow hover:shadow-lg hover:border-blue-500 transition duration-200"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-1">
                  {s.name} <span className="text-sm text-gray-500">({s.englishName})</span>
                </h2>
                <p className="text-sm text-gray-600">Verses: {s.ayahs}</p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-10">No chapters found.</p>
        )}
      </div>
    </main>
  );
}
