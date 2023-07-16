import Head from "next/head";
import Link from "next/link";
import { userError, userSuccess } from "../common/alert";
import { valiadteEmail } from "../common/validater";
import { checkAuthToHome, register } from "../common/user";
import { useEffect } from "react";

export async function getServerSideProps(context) {
  const redirect = await checkAuthToHome(context.req.cookies.auth);
  return redirect;
}

export default function Register({ setLoading, removeCookie = false }) {
  useEffect(() => {
    if (removeCookie) {
      console.log("removeCookie", authToken);
      setAuthToken("auth", "", { path: "/" });
    }
  });

  const onRegister = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    if (username.length < 4) {
      return userError("Error", "Username must be at least 4 characters");
    }

    if (!valiadteEmail(email)) {
      return userError("Error", "Email is not valid");
    }

    if (password !== confirmPassword) {
      return userError("Error", "Password and Confirm Password not match");
    }

    if (password.length < 8) {
      return userError("Error", "Password must be at least 8 characters");
    }
    setLoading(true);
    const user = await register(username, email, password, setLoading);

    if (user) {
      await userSuccess("Success", "Register success");
      window.location.href = "/login";
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
            <Link
              href="/login"
              className="flex w-full rounded-lg items-center justify-center py-1 text-gray-300 font-bold cursor-pointer"
            >
              Login
            </Link>
            <div className="flex w-full rounded-lg items-center justify-center py-1 text-[#1E293B] bg-gray-300 font-bold">
              Register
            </div>
          </div>
        </div>

        <div className="text-[#ffffff] text-[23px] my-8 ml-5 font-bold">
          Connect with me!
        </div>
        <form className="px-3" onSubmit={onRegister}>
          <div className="text-white mb-3 text-[18px]">Username*</div>
          <div
            className="grid gap-4 bg-[#1E293B] rounded-lg px-3 py-2"
            style={{ gridTemplateColumns: "30px 1fr" }}
          >
            <span className="material-symbols-outlined text-[30px] text-gray-300">
              account_circle
            </span>
            <input
              className="bg-tranparent text-[18px]"
              type="text"
              placeholder="username"
              name="username"
              required
            />
          </div>
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
          <div className="text-white mb-3 mt-7 text-[18px]">
            Confirm Password*
          </div>
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
              placeholder="confirm password"
              name="confirmPassword"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-[#246BFD] text-[18px] py-2 mt-20 cursor-pointer flex justify-center w-full items-center rounded-lg"
          >
            Register
          </button>
        </form>
      </div>
    </>
  );
}
