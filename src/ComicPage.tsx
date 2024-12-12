import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Comic, fetchMarvelComicById } from './api/marvel';


interface ComicPageProps {
  comic: Comic | null;
  setCurrentComic: (comic: Comic) => void;
}

const ComicPage: React.FC<ComicPageProps> = ({ comic, setCurrentComic }) => {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const getComic = async () => {
      if (!comic && id) {
        const fetchedComic = await fetchMarvelComicById(parseInt(id));
        setCurrentComic(fetchedComic);
      }
    };

    getComic();
  }, [comic, id, setCurrentComic]);

  if (!comic) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-4">{comic.title}</h1>
      <img
        src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
        alt={comic.title}
        className="w-full h-128 w-96 object-cover"
      />
      <p className="mt-4">{comic.description}</p>
    </div>
  );
};

export default ComicPage;