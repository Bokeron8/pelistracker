"use server"
import { isLoggedIn } from "./auth";

export interface MultiResult {
    page: number
    results: Result[]
    total_pages: number
    total_results: number
  }
  
  export interface Result {
    backdrop_path: string
    id: number
    name?: string
    original_name?: string
    overview: string
    poster_path: string
    media_type: "tv" | "movie" | "person"
    adult: boolean
    original_language: string
    genre_ids: number[]
    popularity: number
    first_air_date?: string
    vote_average: number
    vote_count: number
    origin_country?: string[]
    title?: string
    original_title?: string
    release_date?: string
    video?: boolean
  }

const baseAPIUrl = "https://api.themoviedb.org/3"
const moviedb_key = process.env.AUTH_TMDB_SECRET

async function accountMovieWatchlist(){
    const {id, username, session_id} = await getAccountInfo()
    const url = `${baseAPIUrl}/account/${id}/watchlist/tv?api_key=${moviedb_key}&language=es-MX&page=1&session_id=${session_id}&sort_by=created_at.asc`;
    const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        }
    };

    const data = await fetch(url, options)
    const json = await data.json()

    return json
}

export async function searchMulti({query}: {query: string}): Promise<MultiResult>{
    const {id, username, session_id} = await getAccountInfo()
    const url = `${baseAPIUrl}/search/multi?query=${query}&api_key=${moviedb_key}&session_id=${session_id}&include_adult=false&language=es-MX&page=1`;
    
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json'
        }
    };

    const data = await fetch(url, options)
    const json = await data.json()
    
    return json
}
export async function addWatch({media_type, media_id, add}: {media_type: "tv" | "movie" | "person", media_id: number, add: boolean}){
    const {id, username, session_id} = await getAccountInfo()

    const url = `${baseAPIUrl}/account/${id}/watchlist?api_key=${moviedb_key}&session_id=${session_id}`;

    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json'
        },
        body: JSON.stringify({media_type: media_type, media_id: media_id, watchlist: add})
    };
    console.log(media_type)
    const data = await fetch(url, options)
    const json = await data.json()
    console.log(json)
}
export async function watchListMovies(){
    const {id, username, session_id} = await getAccountInfo()
    const url = `${baseAPIUrl}/account/${id}/watchlist/movies?api_key=${moviedb_key}&language=es-MX&page=1&session_id=${session_id}&sort_by=created_at.asc`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json'
        }
    };
    const data = await fetch(url, options)
    const json = await data.json()
    return json.results
}

export async function watchListSeries({language = "es-MX", page = 1, sort_by="created_at.asc"}: {language?: string, page?: number, sort_by?: string}){
    const {id, username, session_id} = await getAccountInfo()
    const url = `${baseAPIUrl}/account/${id}/watchlist/tv?api_key=${moviedb_key}&language=${language}&page=${page}&session_id=${session_id}&sort_by=${sort_by}`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json'
        }
    };
    const data = await fetch(url, options)
    const json = await data.json()
    return json.results
}

export async function getAccountInfo(){
    const session = await isLoggedIn()
    if(!session){
        return {id: null, username: null, session_id: null}
    }
    const session_id = session.value
    const url = `${baseAPIUrl}/account?api_key=${moviedb_key}&session_id=${session_id}`
    const data = await fetch(url)
    const {success, id, username, status_message}:{success: boolean, id: number, username: string, status_message: string} = await data.json()
    if(success == false){
        return {}
    }
    else{
        return {id, username, session_id}
    }
}





