import Head from "next/head";
import { checkWantToLogin } from "../common/user";
import Navbar from "../components/Navbar";
import Link from "next/link";
import Swal from "sweetalert2";

export async function getServerSideProps(context) {
  const redirect = await checkWantToLogin(context.req.cookies.auth);
  return redirect;
}
export default function Setting({ user }) {

  const onLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of the system.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, logout!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        window.location.href = "/logout";
      }
    });
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
        <div className="flex items-center gap-7 bg-[#0C2237] rounded-b-lg py-8 px-9">
          <span className="material-symbols-outlined text-white cursor-pointer"
                style={{fontSize: '4.5rem'}}>
            account_circle
          </span>
          <div>
            <div className="text-[#f3aa60] text-xl font-bold">{user.name}</div>
            <div className="text-gray-500 text-[15px] font-bold">
              {user.email}
            </div>
          </div>
        </div>
        <div className="bg-[#0C2237] flex items-center w-fit py-2 px-3 rounded-xl gap-2 mt-5 text-[12px] text-[#f3aa60] font-bold">
          <span className="material-symbols-outlined text-[#f3aa60] font-bold">
            grade
          </span>
          ผู้ใช้คนที่ {user.id}
        </div>
        <Link
          href="/setting/account"
          className="text-gray-300 flex items-center bg-[#0C2237] mt-5 p-7 gap-5 text-md cursor-pointer rounded-xl"
        >
          <span className="material-symbols-outlined text-gray-300 text-3xl">
            person
          </span>
          Account Settings
        </Link>
        <div onClick={onLogout} className="text-gray-300 flex items-center bg-[#0C2237] mt-5 p-7 gap-5 text-md cursor-pointer rounded-xl">
          <span className="material-symbols-outlined text-gray-300 text-3xl">
            logout
          </span>
          Logout
        </div>
      </div>
    </>
  );
}
