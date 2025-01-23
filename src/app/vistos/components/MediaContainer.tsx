"use client"

import { useState } from "react";
import { TWatchResult } from "@/app/login/lib/tmdb";
import MediaList from "./MediaList";


type MediaCategory = {
  name: string;
  media: TWatchResult[];
  media_type: "tv" | "movie" | "person";
};

export default function MediaContainer({
  medias,
}: {
  medias: MediaCategory[];
}) {
  const [mediaIdx, setMediaIdx] = useState(0);
  const [localMedias, setLocalMedias] = useState(medias);

  const handleClick = (idx: number) => {
    setMediaIdx(idx);
  };

  const changeMedia = (media: TWatchResult[]) => {
    const updatedMedias = [...localMedias];
    updatedMedias[mediaIdx].media = media;
    setLocalMedias(updatedMedias);
  };

  return (
    <div className="w-[80%] flex flex-col items-center">
      <div className="flex bg-neutral-300 w-full h-16 rounded-t justify-evenly text-center text-gray-800">
        {localMedias.map((item, idx) => (
          <button
            onClick={() => handleClick(idx)}
            className={`w-full h-full flex items-center justify-center bg-${idx % 2 == 0?"[#93C5FD]":"green-300"}`}
            key={idx}
          >
            {item.name} ({item.media.length})
          </button>
        ))}
      </div>
      <MediaList media={localMedias[mediaIdx]} setMedia={changeMedia} />
    </div>
  );
}
