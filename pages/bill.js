import Link from "next/link";
import { checkWantToLogin } from "../common/user";
import Navbar from "../components/Navbar";
import Topbar from "../components/Topbar";

export async function getServerSideProps(context) {
  const redirect = await checkWantToLogin(context.req.cookies.auth);
  return redirect;
}
export default function Bill({ user }) {

  return (
    <>
      <Navbar active="Bill" />
      <div className="pb-5">
        <Topbar showBack={false} title="Bills" />
        <Link
          href="/bill/create"
          className="px-4 bg-[#0C2237] flex justify-center items-center p-5 mt-4 rounded-lg cursor-pointer text-xl gap-2"
        >
          <span className="material-symbols-outlined">add</span>
          เรียกเก็บเงิน
        </Link>

        
      </div>
    </>
  );
}
