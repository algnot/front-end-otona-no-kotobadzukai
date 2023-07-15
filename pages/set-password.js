import React from 'react'
import Topbar from '../components/Topbar'
import { checkWantToLogin, setPassword } from '../common/user';
import { userError, userSuccess } from '../common/alert';
import { useCookies } from "react-cookie";

export async function getServerSideProps(context) {
    const redirect = await checkWantToLogin(context.req.cookies.auth, true);
    return redirect;
}

export default function setPasswordCom({user, setLoading}) {
    const [authToken, setAuthToken] = useCookies(["auth"]);

    const onSubmit = async (e) => {
        try {
            const password = e.target.password.value;
            const confirmPassword = e.target.confirmPassword.value;

            if(password.length < 8) {
                return userError("Error", "Password must be at least 8 characters");
            }

            if(password !== confirmPassword) {
                return userError("Error", "Password and confirm password must be the same");
            }

            const response = await setPassword(authToken.auth, password, setLoading);

            if(response) {
                await userSuccess("Success", "Password set successfully");
                window.location.href = "/home";
            }
        } catch (error) {
            userError("Error", error.message);
        }
    }

  return (
    <div>
      <Topbar title="Set your password" showBack={false} />
      <form onSubmit={onSubmit}>
        <div className="text-white mb-3 mt-20 text-[18px]">Password*</div>
        <div
          className="grid gap-4 bg-[#1E293B] rounded-lg px-3 py-2"
          style={{ gridTemplateColumns: "30px 1fr" }}
        >
          <span class="material-symbols-outlined text-[28px] text-gray-300">
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

        <div className="text-white mb-3 mt-7 text-[18px]">Confirm Password*</div>
        <div
          className="grid gap-4 bg-[#1E293B] rounded-lg px-3 py-2"
          style={{ gridTemplateColumns: "30px 1fr" }}
        >
          <span class="material-symbols-outlined text-[28px] text-gray-300">
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
            className="bg-[#246BFD] text-[18px] py-3 mt-20 cursor-pointer flex justify-center w-full items-center rounded-lg"
          >
            Set Password
          </button>
      </form>
    </div>
  );
}
