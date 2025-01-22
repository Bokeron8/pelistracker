"use client"

import Image from "next/image";
import { FaEyeSlash } from "react-icons/fa";

import  { addWatch } from "@/app/login/lib/tmdb"

const mediaPath = "https://image.tmdb.org/t/p/w200/"


type Media = {
    title: string;
    poster_path: string;
    overview: string;
    name: string;
    release_date: string;
    first_air_date: string;
    id: number;
};
  
type MediaCategory = {
    name: string;
    media: Media[];
    quantity: number;
    media_type: "tv" | "movie" | "person";
};

export default function MediaList({media, setMedia}: {media: MediaCategory}){
    const removeWatch = async (id: number) => {
        setMedia(media.media.filter(movie => movie.id != id))
        await addWatch({media_type: media.media_type, media_id:id, add:false})
    }
    return (
    
        <div className="grid grid-cols-1 gap-2">
            {media.media.map(({title, poster_path, overview, name, release_date, first_air_date, id}) => (
                <div className="grid grid-cols-1 justify-items-center md:grid-cols-[200px_auto] p-5 bg-gray-200 gap-4 rounded w-full" key={crypto.randomUUID()}>
                    <img src={mediaPath+poster_path} className="rounded md:max-h-[300px] max-h-[200px]"></img>
                    <div className="text-wrap max-w-[80%]">
                        <h1 className="font-bold text-lg">{title || name}</h1>
                        <h5 className="text-base text-gray-500">{release_date || first_air_date}</h5>
                        <h3>{overview}</h3>
                    </div>
                    <div className="mt-auto md:col-span-2">
                        <button className="px-8 p-3 bg-red-500 rounded text-base text-white flex items-center gap-4 hover:bg-red-600" onClick={() => removeWatch(id)}> 
                            <FaEyeSlash/> Quitar de la lista de visto
                        </button>
                    </div>
                </div>
            ))}
        </div>
    
    )
}