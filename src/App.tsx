import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import ComicList from './ComicList';
import ComicPage from './ComicPage';
import { Comic, fetchMarvelComics, fetchMarvelComicById } from './api/marvel';

const App: React.FC = () => {
  const [comics, setComics] = useState<Comic[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [currentComic, setCurrentComic] = useState<Comic | null>(null);

  useEffect(() => {
    const getComics = async (page: number) => {
      setLoading(true);
      const newComics = await fetchMarvelComics(page);
      setComics((prevComics) => [...prevComics, ...newComics]);
      setLoading(false);
    };

    if (comics.length === 0) {
      getComics(page);
    }
  }, [page, comics.length]);

  const handleComicClick = async (id: number) => {
    const comic = comics.find((comic) => comic.id === id);
    if (comic) {
      setCurrentComic(comic);
    } else {
      const fetchedComic = await fetchMarvelComicById(id);
      setCurrentComic(fetchedComic);
    }
  };

  return (
    <Router>
      <div className="min-h-screen w-full bg-gray-900 flex flex-col">
        <div className="container mx-auto p-4 flex flex-col items-start">
          <h1 className="text-3xl font-bold mb-4 text-white">Marvel Comics</h1>
          <Routes>
            <Route
              path="/"
              element={
                <ComicList
                  comics={comics}
                  loading={loading}
                  setPage={setPage}
                  handleComicClick={handleComicClick}
                />
              }
            />
            <Route
              path="/comic/:id"
              element={<ComicPage comic={currentComic} setCurrentComic={setCurrentComic} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;