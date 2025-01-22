"use client"

import { addWatch } from "../login/lib/tmdb"


const mediaPath = "https://image.tmdb.org/t/p/w200/"
export default function MediaList({media}){

    return (
    <div className="grid grid-cols-1 gap-2 max-w-[80%] mt-2">
        {media.map(({title, poster_path, overview, name, release_date, first_air_date, media_type, id}) => (
          <div className="flex p-5 bg-gray-200 gap-4 rounded w-full" key={crypto.randomUUID()}>
            <img src={mediaPath+poster_path} className="rounded md:max-h-[300px] max-h-[200px]"></img>
            <div className="flex flex-col text-wrap max-w-[80%]">
              <h1 className="font-bold text-lg">{title || name}</h1>
              <h5 className="text-base text-gray-500">{release_date || first_air_date}</h5>
              <h3>{overview}</h3>
              <div className="mt-auto">
                <button className="px-8 p-3 bg-green-300 rounded text-base" onClick={()=>addWatch({media_type, media_id:id, add:true})}>Visto</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
}