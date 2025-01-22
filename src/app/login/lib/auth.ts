"use server"
import { redirect } from "next/navigation"
import { cookies, headers } from "next/headers"



const baseAPIUrl = "https://api.themoviedb.org/3"
const moviedb_key = process.env.AUTH_TMDB_SECRET

type responseToken = {
    success: boolean, expires_at: string, request_token: string
}

export const  login = async () => {
    const headersList = await headers();
    const domain = headersList.get('referer') || "";
    const token = await createRequestToken()
    const authUrl = "https://www.themoviedb.org/authenticate/"
    if(token.success){
        const cookieStore = await cookies()
        cookieStore.set('token', token.request_token)
        redirect(`${authUrl}${token.request_token}?redirect_to=${domain}`)
    }
    return token
}

export const logout = async  () => {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')

    const url = `${baseAPIUrl}/authentication/session?api_key=${moviedb_key}`;
    const options = {
        method: 'DELETE',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
        },
        body: JSON.stringify({session_id: token})
    };

    fetch(url, options)
    cookieStore.delete("token")
    cookieStore.delete("sessionId")
}

export const authenticate = async ({token}) => {
    const cookieStore = await cookies()
    if(token){
        const authRoute = `${baseAPIUrl}/authentication/session/new?api_key=${moviedb_key}&request_token=${token.value}`
        const data = await fetch(authRoute)
        const json = await data.json()
        console.log(json)
        cookieStore.set('sessionId', json.session_id)
    }
}

export const isLoggedIn = async () => {
    const cookieStore = await cookies()
    const sessionId = cookieStore.get('sessionId')
    if(sessionId !== undefined){
        return sessionId
    }else{
        return null
    }
}

async function createRequestToken(): Promise<responseToken>{
    const url = `${baseAPIUrl}/authentication/token/new?api_key=${moviedb_key}`;
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