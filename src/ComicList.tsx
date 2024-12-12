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

  useEffect(() => {
    const getComics = async () => {
      setLoading(true);
      const comics = await fetchMarvelComics();
      setComics(comics);
      setLoading(false);
    };
    getComics();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

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
    </div>
  );
};

export default ComicList;