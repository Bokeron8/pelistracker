"use server"
import LoginButton from "./components/LoginButton"
import LogoutButton from "./components/LogoutButton"

import { getAccountInfo } from "./lib/tmdb"


export default async function Login() {
    const {username} = await getAccountInfo()
    console.log(username)
    return (
    <div className="flex gap-4">
        {username ? `Iniciaste sesion como: ${username}` : "No iniciaste sesion"}
        <LoginButton />
        <LogoutButton />
    </div>
    )
}