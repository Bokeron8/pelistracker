
"use server"
import { isLoggedIn } from "./auth";


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

export async function searchMulti({query}){
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
    console.log(json.results)
    return json.results
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
    var session_id = await isLoggedIn()
    if(!session_id){
        return {id: null, username: null, session_id: null}
    }
    session_id = session_id.value
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





