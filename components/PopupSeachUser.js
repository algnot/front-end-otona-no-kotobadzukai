import Head from "next/head";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { userError } from "../common/alert";
import { valiadteEmail } from "../common/validater";
import { searchUserByEmail } from "../common/searcher";

export default function PopupSeachUser({ closePopup, setUser }) {
  const [mode, setMode] = useState("search");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init();
  }, []);

  const onSearchUser = async (e) => {
    e.preventDefault();
    try {
      const email = e.target.email.value;
      if (!valiadteEmail(email)) {
        userError("Error", "กรุณากรอกอีเมลให้ถูกต้อง");
        return;
      }
      setLoading(true);
      const user = await searchUserByEmail(email);
      if (user.length === 0) {
        setLoading(false);
        userError("Error", "ไม่พบผู้ใช้งาน");
        return;
      }
      setUser({
        uid: user[0].uid,
        name: user[0].name,
        email: user[0].email
      });
      closePopup();
    } catch (error) {
      userError("Error", error.message);
    }
  };

  const onAddUser = async (e) => {
    e.preventDefault();
    try {
      const name = e.target.name.value;
      const email = e.target.email.value;
      if (!valiadteEmail(email)) {
        userError("Error", "กรุณากรอกอีเมลให้ถูกต้อง");
        return;
      }
      setUser({
        name: name,
        email: email,
      });
      closePopup();
    } catch (error) {
      userError("Error", error.message);
    }
  };

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
        />
        <script src="https://cdn.lordicon.com/bhenfmcm.js"></script>
      </Head>
      <div className="fixed z-10 bg-[#00000045] top-0 right-0 w-[100vw] h-[100vh] flex items-center justify-center px-3">
        <div
          className=" container bg-[#1E293B] rounded-lg p-5 h-fit"
          data-aos="zoom-in"
        >
          <div className="flex justify-between items-center">
            <div className="text-[#f3aa60] text-xl font-bold">
              {mode === "search"
                ? "ค้นหาผู้ใช้งาน"
                : "เพิ่มรายละเอียดผู้เรียกเก็บเงิน"}
            </div>
            <span
              className="material-symbols-outlined font-bold cursor-pointer"
              onClick={() => closePopup(false)}
            >
              close
            </span>
          </div>

          {loading && (
            <center>
              <lord-icon
                src="https://cdn.lordicon.com/ymrqtsej.json"
                trigger="loop"
                colors="primary:#ffffff"
                style={{ width: "100px", height: "100px" }}
              />
            </center>
          )}

          {mode === "search" && !loading && (
            <form onSubmit={onSearchUser}>
              <div className="text-white mb-3 mt-8 text-[18px]">
                ชื่อหรืออีเมล
              </div>
              <div
                className="grid gap-4 bg-[#171822] rounded-lg px-3 py-2"
                style={{ gridTemplateColumns: "30px 1fr" }}
              >
                <span className="material-symbols-outlined text-[28px] text-gray-300">
                  person
                </span>
                <input
                  className="bg-tranparent text-[18px]"
                  type="text"
                  placeholder="test@gmail.com"
                  name="email"
                />
              </div>
              <button
                type="submit"
                className="bg-[#246BFD] text-[18px] py-2 mt-10 cursor-pointer flex justify-center w-full items-center rounded-lg"
              >
                ค้นหาผู้ใช้
              </button>
              <div
                className="mt-8 text-[#246BFD] text-center cursor-pointer underline"
                onClick={() => setMode("add")}
              >
                ผู้ที่เรียกเก็บเงินไม่ได้สมัครสมาชิก?
              </div>
            </form>
          )}

          {mode === "add" && !loading && (
            <form onSubmit={onAddUser}>
              <div className="text-white mb-3 mt-8 text-[18px]">ชื่อ</div>
              <div
                className="grid gap-4 bg-[#171822] rounded-lg px-3 py-2"
                style={{ gridTemplateColumns: "30px 1fr" }}
              >
                <span className="material-symbols-outlined text-[28px] text-gray-300">
                  person
                </span>
                <input
                  className="bg-tranparent text-[18px]"
                  type="text"
                  placeholder="test test"
                  name="name"
                />
              </div>
              <div className="text-white mb-3 mt-8 text-[18px]">อีเมล</div>
              <div
                className="grid gap-4 bg-[#171822] rounded-lg px-3 py-2"
                style={{ gridTemplateColumns: "30px 1fr" }}
              >
                <span className="material-symbols-outlined text-[28px] text-gray-300">
                  email
                </span>
                <input
                  className="bg-tranparent text-[18px]"
                  type="text"
                  placeholder="test@gmail.com"
                  name="email"
                />
              </div>
              <button
                type="submit"
                className="bg-[#246BFD] text-[18px] py-2 mt-10 cursor-pointer flex justify-center w-full items-center rounded-lg"
              >
                เพิ่มผู้เรียกเก็บเงิน
              </button>
              <div
                className="mt-8 text-[#246BFD] text-center cursor-pointer underline"
                onClick={() => setMode("search")}
              >
                ผู้ที่เรียกเก็บเงินเป็นสมาชิกอยู่แล้ว?
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
