import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isLoggedIn } from "./app/login/lib/auth";
import { cookies } from "next/headers";
import { authenticate } from "./app/login/lib/auth";

const protectedRoutes = ["/vistos"]

export default async function middleware(request: NextRequest){
    const sessionId = await isLoggedIn()

    const cookieStore = await cookies()
    const token = cookieStore.get('token')
    if(token){
        await authenticate({token})
        cookieStore.delete('token')
    }
    const {pathname} = request.nextUrl
    const isProtected = protectedRoutes.some((route) => pathname.startsWith(route)) || pathname == "/"
    if(isProtected && !sessionId){
        return NextResponse.redirect(new URL("/login", request.url));
    } 

    return NextResponse.next();
}