import Head from "next/head";
import { checkWantToLogin, linkGoogle, updateProfile } from "../../common/user";
import Navbar from "../../components/Navbar";
import Topbar from "../../components/Topbar";
import { userError, userSuccess } from "../../common/alert";
import { useCookies } from "react-cookie";

export async function getServerSideProps(context) {
  const redirect = await checkWantToLogin(context.req.cookies.auth);
  return redirect;
}
export default function Setting({ user, setLoading }) {
  const [authToken] = useCookies(["auth"]);
  const onLinkGoogle = async () => {
    try {
        const response = await linkGoogle(authToken.auth, user.email, setLoading);
        if(response) {
            await userSuccess("Success", `Link google success`);
            window.location.reload();
        }
    } catch (error) {
        userError("Error", error.message);
    }
  }

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      const username = e.target.username.value;
      const response = await updateProfile(authToken.auth, username, setLoading);
      if (response) {
        await userSuccess("Success", "Profile updated successfully");
        window.location.reload();
      }
    } catch (error) {
      userError("Error", error.message);
    }
  }

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
        />
      </Head>
      <Navbar active="Setting" />
      <div className="pb-6">
        <Topbar href="/setting" title="Account Setting" />
        <form className="mt-10" onSubmit={onSubmit}>
          <div className="flex items-center justify-center mb-10">
            <span className="material-symbols-outlined text-gray-300"
                  style={{fontSize: '100px'}}>
              account_circle
            </span>
          </div>

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
              defaultValue={user.name}
              required
            />
          </div>

          <div className="text-white mb-3 text-[18px] mt-5">Email</div>
          <div
            className="grid gap-4 bg-[#1E293B] rounded-lg px-3 py-2"
            style={{ gridTemplateColumns: "30px 1fr" }}
          >
            <span className="material-symbols-outlined text-[30px] text-gray-300">
              email
            </span>
            <input
              className="bg-tranparent text-[18px] text-gray-500"
              type="text"
              placeholder="email"
              defaultValue={user.email}
              disabled
            />
          </div>

          <div className="text-white mb-3 text-[18px] mt-5">Linked Account</div>
          {user.googleAuthId ? (
            <div className="border-2 border-[#246BFD] text-[#246BFD] w-fit p-3 mt-5 flex items-center justify-center rounded-lg">
              <img src="/asset/icons/google.png" className="w-5 h-5 mr-2" />
              {user.googleAuthId} (Linked)
            </div>
          ) : (
            <div className="border-2 border-[#246BFD] text-[#246BFD] w-fit p-3 mt-5 flex cursor-pointer items-center justify-center rounded-lg"
                 onClick={onLinkGoogle}>
              <img src="/asset/icons/google.png" className="w-5 h-5 mr-2" />
              Link Google Account
            </div>
          )}

          <button
            type="submit"
            className="bg-[#246BFD] text-[18px] py-3 mt-10 cursor-pointer flex justify-center w-full items-center rounded-lg"
          >
            Save Changes
          </button>
        </form>
      </div>
    </>
  );
}
