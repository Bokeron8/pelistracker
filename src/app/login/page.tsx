"use server"
import LoginButton from "./components/LoginButton"
import LogoutButton from "./components/LogoutButton"




export default async function Login() {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NmE4NGE2YmZkMjU4NzU4YWU2NTg1MDVhYWViZmM4YSIsIm5iZiI6MTczNjc3NTA2NC44MjA5OTk5LCJzdWIiOiI2Nzg1MTU5OGM4MWFjYWE2M2RiYzA1MjQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.pKv3cNHvuvheHOY_2SgJS1UqN5LRoM_XfWB2W8mXVlw'
        }
      };
      
    const data = await fetch('https://api.themoviedb.org/3/account/21748492', options)
    const json = await data.json()

    const {username} = json
    console.log(username)
    return (
    <div className="flex gap-4">
        {username ? `Iniciaste sesion como: ${username}` : "No iniciaste sesion"}
        <LoginButton />
        <LogoutButton />
    </div>
    )
}