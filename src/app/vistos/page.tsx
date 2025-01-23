
import {watchListMovies, watchListSeries, TWatchResult} from "../login/lib/tmdb"
import MediaContainer from "./components/MediaContainer"


type MediaCategory = {
  name: string;
  media: TWatchResult[];
  media_type: "tv" | "movie" | "person";
};

export default async function Vistos() {
  
  const movies = (await watchListMovies()).results
  const series = (await watchListSeries({})).results
  const items: MediaCategory[] = [{name: "Peliculas Vistas", media: movies, media_type: "movie"}, {name: "Series Vistas", media: series, media_type: "tv"}]

  return (
    <div className="pt-3 flex flex-col items-center mt-2">    

      <MediaContainer medias={items}/>
    </div>

  );
}

