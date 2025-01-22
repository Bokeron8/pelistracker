"use client"
import { login } from "../lib/auth"

export default function LoginButton(){
    return (
    <button onClick={() => login()} className="bg-red-300 p-5 rounded">
        Iniciar sesion
    </button>)
}