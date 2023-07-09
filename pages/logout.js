import { useEffect } from 'react'
import { useCookies } from "react-cookie";
import Loading from '../components/Loading';

export default function logout() {
  const [authToken, setAuthToken] = useCookies(["auth"]);

  useEffect(()=> {
    console.log("Remove cookie", authToken);
    onLogout()
  })

  const onLogout = async () => {
    setAuthToken("auth", "", { path: "/" });
    window.location.href = "/";
  }

  return (
    <div>
        <Loading/>
    </div>
  )
}
