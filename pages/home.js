import Link from "next/link";
import { checkWantToLogin } from "../common/user";
import Navbar from "../components/Navbar";

export async function getServerSideProps(context) {
  const redirect = await checkWantToLogin(context.req.cookies.auth);
  return redirect;
}
export default function Home({ user }) {
  const getWelcomeMessageByDateTime = () => {
    const date = new Date();
    const hour = date.getHours();
    if (hour >= 5 && hour < 8) {
      return "Good Morning! ☀️";
    } else if (hour >= 12 && hour < 18) {
      return "Good Afternoon! ☀️";
    } else {
      return "Good Evening! 🌙";
    }
  };

  return (
    <>
      <Navbar active="Home" />
      <div className="py-5">
        <div className="p-8 px-14 flex justify-between items-center">
          <div>
            <div className="text-md">{getWelcomeMessageByDateTime()}</div>
            <div className="text-xl font-bold mt-2">{user.name}</div>
          </div>
          <Link
            href="/setting"
            className="material-symbols-outlined text-white cursor-pointer"
            style={{fontSize: "3rem"}}
          >
            account_circle
          </Link>
        </div>
      </div>
    </>
  );
}
