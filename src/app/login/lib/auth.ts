"use server"
import { redirect } from "next/navigation"
import { cookies, headers } from "next/headers"


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

    const url = 'https://api.themoviedb.org/3/authentication/session';
    const options = {
        method: 'DELETE',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NmE4NGE2YmZkMjU4NzU4YWU2NTg1MDVhYWViZmM4YSIsIm5iZiI6MTczNjc3NTA2NC44MjA5OTk5LCJzdWIiOiI2Nzg1MTU5OGM4MWFjYWE2M2RiYzA1MjQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.pKv3cNHvuvheHOY_2SgJS1UqN5LRoM_XfWB2W8mXVlw'
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
        const authRoute = `https://api.themoviedb.org/3/authentication/session/new?api_key=86a84a6bfd258758ae658505aaebfc8a&request_token=${token.value}`
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
    const url = 'https://api.themoviedb.org/3/authentication/token/new';
    const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NmE4NGE2YmZkMjU4NzU4YWU2NTg1MDVhYWViZmM4YSIsIm5iZiI6MTczNjc3NTA2NC44MjA5OTk5LCJzdWIiOiI2Nzg1MTU5OGM4MWFjYWE2M2RiYzA1MjQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.pKv3cNHvuvheHOY_2SgJS1UqN5LRoM_XfWB2W8mXVlw'
    }
    };

    const data = await fetch(url, options)
    const json = await data.json()

    return json
}