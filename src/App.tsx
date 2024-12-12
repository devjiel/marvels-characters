import React from 'react';
import ComicList from './ComicList';

const App: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Marvel Comics</h1>
      <ComicList />
    </div>
  );
};

export default App;