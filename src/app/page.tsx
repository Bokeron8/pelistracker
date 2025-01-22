'use client'
import { useState } from "react";
import {searchMulti, Result} from "./login/lib/tmdb"
import MediaList from "./components/MediaList";



export default function Home() {
  const [search, setSearch] = useState('');
  const [media, setMedia] = useState<Result[]>([]);
  function loadMovies({query}: {query: string}){
    searchMulti({query}).then((data) => {
      const results = data.results
      setMedia(results.filter(({media_type}: {media_type: string}) => media_type === 'movie' || media_type === 'tv'))
    });
  }

  const onTextChange = (e: React.ChangeEvent<HTMLInputElement >) => {
    setSearch(e.target.value)
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement >) =>{
    if (e.key === 'Enter') {
      loadMovies({query: search})
    }
  }

  return (
    <div className="pt-3 flex flex-col items-center">    
      <div className="bg-gray-300 p-3 rounded">
        <input type="text" placeholder="serie o pelicula" value={search} onChange={onTextChange} onKeyDown={handleKeyDown} className="text-black bg-transparent focus:outline-none"/>
        <button onClick={() => loadMovies({query: search})} className="text-bold">Buscar</button>
      </div>
      <MediaList media={media}/>

    </div>

  );
}

