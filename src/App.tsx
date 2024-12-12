import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ComicList from './ComicList';
import ComicPage from './ComicPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen w-full bg-gray-900 flex flex-col">
        <div className="container mx-auto p-4 flex flex-col items-start">
          <h1 className="text-3xl font-bold mb-4 text-white">Marvel Comics</h1>
          <Routes>
            <Route path="/" element={<ComicList />} />
            <Route path="/comic/:id" element={<ComicPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;