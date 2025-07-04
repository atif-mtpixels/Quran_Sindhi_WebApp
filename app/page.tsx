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
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <h1 className="text-4xl font-extrabold text-blue-800 tracking-tight flex items-center gap-2">
          <span role="img" aria-label="book">📖</span> Quran Chapters
        </h1>
        <label className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-sm">
          <span className="font-medium text-gray-700">Edition:</span>
          <select
            value={selectedEdition}
            onChange={(e) => setSelectedEdition(e.target.value)}
            className="ml-2 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 focus:outline-none bg-gray-50 text-gray-700"
          >
            {editions.map((ed) => (
              <option key={ed.value} value={ed.value}>
                {ed.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {chapters.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {chapters.map((s) => (
            <Link
              key={s.chapter}
              href={`/${s.chapter}`}
              className="block bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl hover:border-blue-500 transition duration-200 group"
            >
              <h2 className="text-2xl font-bold text-blue-700 mb-2 group-hover:text-blue-900 transition">
                {s.name} <span className="text-base text-gray-500 font-normal">({s.englishName})</span>
              </h2>
              <p className="text-sm text-gray-600">Verses: {s.ayahs}</p>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">No chapters found.</p>
      )}
    </div>
  );
}
