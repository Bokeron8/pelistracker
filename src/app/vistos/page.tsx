
import {watchListMovies, watchListSeries} from "../login/lib/tmdb"
import MediaContainer from "./components/MediaContainer"


export default async function Vistos() {
  
  const movies = await watchListMovies()
  const series = await watchListSeries({})
  const items = [{name: "Peliculas Vistas", media: movies, media_type: "movie"}, {name: "Series Vistas", media: series, media_type: "tv"}]

  return (
    <div className="pt-3 flex flex-col items-center mt-2">    

      <MediaContainer medias={items}/>
    </div>

  );
}

