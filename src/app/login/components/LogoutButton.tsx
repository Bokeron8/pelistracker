"use client"
import { logout } from "../lib/auth"

export default function LogoutButton(){
    return (
    <button onClick={() => logout().then((r) => console.log(r))} className="bg-red-300 p-5 rounded">
        Cerrar sesion
    </button>)
}