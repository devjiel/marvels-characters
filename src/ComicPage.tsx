import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMarvelComicById } from './api/marvel';

interface Comic {
  id: number;
  title: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

const ComicPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [comic, setComic] = useState<Comic | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getComic = async () => {
      if (id) {
        setLoading(true);
        const comicData = await fetchMarvelComicById(parseInt(id));
        setComic(comicData);
        setLoading(false);
      }
    };

    getComic();
  }, [id]);

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (!comic) {
    return <div className="text-white">Comic not found</div>;
  }

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-4">{comic.title}</h1>
      <img
        src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
        alt={comic.title}
        className="w-full h-96 object-cover"
      />
      <p className="mt-4">{comic.description}</p>
    </div>
  );
};

export default ComicPage;