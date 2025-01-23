"use client"
import { authenticate } from "@/app/login/lib/auth"
import { useEffect } from "react"
export default function Login() {
    useEffect(() => {
        const auth = async () => {
            await authenticate()
        }

        auth()
    },[])
    return (
    <div className="flex gap-4">
        autheticating
    </div>
    )
}