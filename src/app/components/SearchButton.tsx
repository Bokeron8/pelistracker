"use client"
import { login } from "@/app/login/lib/auth"

export default function SearchButton(){
    return (
    <button onClick={() => login()} className="bg-red-300 p-5">
        Login
    </button>)
}