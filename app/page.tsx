'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

type Chapter = {
  chapter: number;
  englishName: string;
  name: string;
  ayahs: number;
};

export default function Home() {
  const [selectedEdition] = useState('sd-ghulamrasoolmehar');
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [lastRead, setLastRead] = useState<number | null>(null);

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const res = await fetch(`/api/chapters/${selectedEdition}`);
        const data = await res.json();
        if (res.ok) {
          setChapters(data.chapters || data);
        } else {
          console.error('Error fetching:', data);
        }
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchChapters();
    setLastRead(Number(localStorage.getItem('lastReadSurah')) || null);
  }, [selectedEdition]);



  const filteredChapters = chapters.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.englishName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className="min-h-screen bg-fixed bg-cover bg-center px-4 py-10 transition-all"
      style={{
        backgroundImage: "url('/islamic-pattern.jpg')",
        backgroundColor: 'rgba(255,255,255,0.9)',
        backgroundBlendMode: 'lighten',
      }}
    >
      <div className="max-w-6xl mx-auto space-y-8 backdrop-blur-sm bg-white/80 dark:bg-black/60 rounded-2xl p-6 shadow-md text-gray-800 dark:text-white">

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-800 dark:text-yellow-400 tracking-tight">
            📖 Quran Chapters
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Explore the 114 Surahs of the Holy Quran
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <input
            type="text"
            placeholder="Search Surah..."
            className="w-full sm:w-1/2 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

        </div>

        {/* Last Read */}
        {lastRead && (
          <div className="text-center mt-2 text-sm">
            📌 Last Read: 
            <Link href={`/${lastRead}`} className="text-blue-600 dark:text-yellow-300 underline ml-1">
              Surah #{lastRead}
            </Link>
          </div>
        )}

        {/* Chapters Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-200 dark:bg-gray-700 animate-pulse h-32 rounded-xl"></div>
            ))}
          </div>
        ) : filteredChapters.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filteredChapters.map((s) => (
              <Link
                key={s.chapter}
                href={`/${s.chapter}`}
                onClick={() => localStorage.setItem('lastReadSurah', s.chapter.toString())}
                className="block bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow hover:shadow-lg hover:border-blue-500 dark:hover:border-yellow-400 transition-all duration-200 group"
              >
                <h2 className="text-2xl font-bold text-blue-700 dark:text-yellow-300 mb-2 group-hover:text-blue-900 dark:group-hover:text-yellow-100 transition">
                  {s.name}
                  <span className="block text-base text-gray-500 dark:text-gray-400 font-normal">
                    {s.englishName}
                  </span>
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">Verses: {s.ayahs}</p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-red-400 text-lg font-medium mt-10">
            No chapters found.
          </p>
        )}
      </div>
    </div>
  );
}
