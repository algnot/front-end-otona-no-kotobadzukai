import Link from "next/link";
import Script from "next/script";
import { checkAuthToHome, loginWithGoogle } from "../common/user";
import { userSuccess } from "../common/alert";
import { useCookies } from "react-cookie";
import { useEffect } from "react";

export async function getServerSideProps(context) {
  const redirect = await checkAuthToHome(context.req.cookies.auth);
  return redirect;
}

export default function Index({setLoading, removeCookie=false}) {
  const [authToken, setAuthToken] = useCookies(["auth"]);

  useEffect(() => {
    if(removeCookie){
      console.log("removeCookie", authToken);
      setAuthToken("auth", "", { path: "/" });
    }
  })
  
  const onLoginWithGoogle = async () => {
    setLoading(true);
    const user = await loginWithGoogle(setLoading);
    if(user){
      setAuthToken("auth", user, { path: "/" });
      await userSuccess("Success", `Login success`);
      window.location.href = "/home";
    }
  }

  return (
    <>
      <Script src="https://cdn.lordicon.com/bhenfmcm.js" />
      <div className="flex flex-col justify-end items-center h-[50vh]">
        <lord-icon
          src="https://cdn.lordicon.com/yeallgsa.json"
          trigger="loop"
          colors="primary:#ddf75f,secondary:#ffffff"
          style={{ width: "150px", height: "150px" }}
        />
        <div className="text-[19px] text-[#ddf75f] mt-2">otona-no-kotobadzukai</div>
      </div>
      <div className="flex flex-col justify-center items-center h-[50vh]">
        <Link href="/login" className="bg-[#246BFD] w-[250px] py-3 cursor-pointer flex justify-center items-center rounded-lg">
          <img src="/asset/icons/email.svg" className="w-5 mr-2" />
          Continue with Email
        </Link>
        <div className="border-2 border-[#246BFD] text-[#246BFD] w-[250px] py-3 mt-3 cursor-pointer flex items-center justify-center rounded-lg"
             onClick={onLoginWithGoogle}>
          <img src="/asset/icons/google.png" className="w-5 h-5 mr-2" />
          Continue with Google
        </div>
        <div className="text-gray-600 mt-5">
          Developed by{" "} @algnot
        </div>
      </div>
    </>
  );
}
