import React from 'react';
import ComicList from './ComicList';

const App: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-[#232323] flex flex-col">
      <div className="container mx-auto p-4 flex flex-col items-start">
        <h1 className="text-3xl font-bold mb-4 text-white">Marvel Comics</h1>
        <div className="w-full flex center">
          <ComicList />
        </div>
      </div>
    </div>
  );
};

export default App;