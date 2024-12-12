import React, { useEffect, useState } from 'react';
import { fetchMarvelComics } from './api/marvel';

interface Comic {
  id: number;
  title: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

const ComicList: React.FC = () => {
  const [comics, setComics] = useState<Comic[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const getComics = async (page: number) => {
      setLoading(true);
      const newComics = await fetchMarvelComics(page);
      setComics((prevComics) => [...prevComics, ...newComics]);
      setLoading(false);
    };

    getComics(page);
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.documentElement.scrollHeight - 100; // Add 100px threshold

      if (scrollPosition < threshold || loading) {
        return;
      }
      setPage((prevPage) => prevPage + 1);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  return (
    <div className="grid grid-cols-5 gap-16">
      {comics.map((comic) => (
        <div key={comic.id}>
          <div className="shadow-md">
            <img
              src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              alt={comic.title}
              className="w-full h-96 object-cover"
            />
          </div>
          <h2 className="mt-2 text-sm text-white font-bold">{comic.title}</h2>
        </div>
      ))}
      {loading && <div className="col-span-5 text-center text-white">Loading...</div>}
    </div>
  );
};

export default ComicList;