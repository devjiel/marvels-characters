import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Comic } from './api/marvel';

interface ComicListProps {
  comics: Comic[];
  loading: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  handleComicClick: (id: number) => void;
}

const ComicList: React.FC<ComicListProps> = ({ comics, loading, setPage, handleComicClick }) => {
  const navigate = useNavigate();

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
  }, [loading, setPage]);

  return (
    <div className="grid grid-cols-5 gap-16">
      {comics.map((comic) => (
        <div key={comic.id} onClick={() => { handleComicClick(comic.id); navigate(`/comic/${comic.id}`); }} className="cursor-pointer">
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