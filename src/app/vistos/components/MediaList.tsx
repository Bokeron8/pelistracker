"use client"

import { FaEyeSlash } from "react-icons/fa";

import  { addWatch, TWatchResult } from "@/app/login/lib/tmdb"

const mediaPath = "https://image.tmdb.org/t/p/w200/"

type MediaCategory = {
    name: string;
    media: TWatchResult[];
    media_type: "tv" | "movie" | "person";
};

export default function MediaList({media, setMedia}: {media: MediaCategory, setMedia: (media: TWatchResult[]) => void}){
    const removeWatch = async (id: number) => {
        setMedia(media.media.filter(movie => movie.id != id))
        await addWatch({media_type: media.media_type, media_id:id, add:false})
    }
    return (
    
        <div className="grid grid-cols-1 gap-2">
  {media.media.map((item) => (
    <div
      className="grid grid-cols-1 justify-items-center md:grid-cols-[200px_auto] p-5 bg-gray-200 gap-4 rounded w-full"
      key={item.id}
    >
      <img
        src={mediaPath + item.poster_path}
        className="rounded md:max-h-[300px] max-h-[200px]"
        alt={item.media_type === 'movie' ? item.title : item.name}
      />
      <div className="text-wrap max-w-[80%]">
        <h1 className="font-bold text-lg">
          {item.media_type === 'movie' ? item.title : item.name}
        </h1>
        <h5 className="text-base text-gray-500">
          {item.media_type === 'movie' ? item.release_date : item.first_air_date}
        </h5>
        <h3>{item.overview}</h3>
      </div>
      <div className="mt-auto md:col-span-2">
        <button
          className="px-8 p-3 bg-red-500 rounded text-base text-white flex items-center gap-4 hover:bg-red-600"
          onClick={() => removeWatch(item.id)}
        >
          <FaEyeSlash /> Quitar de la lista de visto
        </button>
      </div>
    </div>
  ))}
</div>

    
    )
}