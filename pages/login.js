import Head from "next/head";
import Link from "next/link";
import { userError, userSuccess } from "../common/alert";
import { valiadteEmail } from "../common/validater";
import { checkAuthToHome, login, loginWithGoogle } from "../common/user";
import { useCookies } from "react-cookie";
import { useEffect } from "react";

export async function getServerSideProps(context) {
  const redirect = await checkAuthToHome(context.req.cookies.auth);
  return redirect;
}

export default function Login({ setLoading, removeCookie=false }) {
  const [authToken, setAuthToken] = useCookies(["auth"]);

  useEffect(() => {
    if(removeCookie){
      console.log("removeCookie", authToken);
      setAuthToken("auth", "", { path: "/" });
    }
  })

  const onForgetPassword = async (e) => {
    userError("Error", "Relex and remember your password :)");
  };

  const onLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!valiadteEmail(email)) {
      return userError("Error", "Email is not valid");
    }

    if (password.length < 8) {
      return userError("Error", "Password must be at least 8 characters");
    }
    setLoading(true);
    const user = await login(email, password, setLoading);
    if (user) {
      setAuthToken("auth", user, { path: "/" });
      await userSuccess("Success", `Login success`);
      window.location.href = "/home";
    }
  };

  const onLoginWithGoogle = async () => {
    setLoading(true);
    const user = await loginWithGoogle(setLoading);
    if (user) {
      setAuthToken("auth", user, { path: "/" });
      await userSuccess("Success", `Login success`);
      window.location.href = "/home";
    }
  };

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
        />
      </Head>
      <div>
        <div className="pt-5"></div>
        <div
          className="grid px-3 gap-3"
          style={{ gridTemplateColumns: "40px 1fr" }}
        >
          <Link
            href="/"
            className="flex items-center justify-center text-white bg-[#1E293B] rounded-lg font-bold px-2 py-1 w-fit cursor-pointer"
          >
            <img src="/asset/icons/back-arrow.svg" className="w-7 h-7 w-fit" />
          </Link>
          <div className="flex rounded-lg items-center justify-between bg-[#1E293B] px-2 py-1">
            <div className="flex w-full rounded-lg items-center justify-center py-1 text-[#1E293B] bg-gray-300 font-bold">
              Login
            </div>
            <Link
              href="/register"
              className="flex w-full rounded-lg items-center justify-center py-1 bg-[#1E293B] font-bold cursor-pointer"
            >
              Register
            </Link>
          </div>
        </div>

        <div className="text-[#ffffff] text-[23px] my-8 ml-5 font-bold">
          Login
        </div>

        <form className="px-3" onSubmit={onLogin}>
          <div className="text-white mb-3 mt-7 text-[18px]">Email*</div>
          <div
            className="grid gap-4 bg-[#1E293B] rounded-lg px-3 py-2"
            style={{ gridTemplateColumns: "30px 1fr" }}
          >
            <span className="material-symbols-outlined text-[28px] text-gray-300">
              mail
            </span>
            <input
              className="bg-tranparent text-[18px]"
              type="text"
              placeholder="email"
              name="email"
              required
            />
          </div>
          <div className="text-white mb-3 mt-7 text-[18px]">Password*</div>
          <div
            className="grid gap-4 bg-[#1E293B] rounded-lg px-3 py-2"
            style={{ gridTemplateColumns: "30px 1fr" }}
          >
            <span className="material-symbols-outlined text-[28px] text-gray-300">
              password
            </span>
            <input
              className="bg-tranparent text-[18px]"
              type="password"
              placeholder="password"
              name="password"
              required
            />
          </div>
          <div
            className="mt-4 text-gray-300 underline cursor-pointer text-right"
            onClick={onForgetPassword}
          >
            Forget Password?
          </div>
          <button
            type="submit"
            className="bg-[#246BFD] text-[18px] py-3 mt-20 cursor-pointer flex justify-center w-full items-center rounded-lg"
          >
            Login
          </button>
          <div
            className="border-2 border-[#246BFD] text-[#246BFD] w-full py-3 mt-5 cursor-pointer flex items-center justify-center rounded-lg"
            onClick={onLoginWithGoogle}
          >
            <img src="/asset/icons/google.png" className="w-5 h-5 mr-2" />
            Continue with Google
          </div>
        </form>
      </div>
    </>
  );
}
