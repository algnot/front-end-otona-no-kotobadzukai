import Head from "next/head";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { userError, userSuccess } from "../common/alert";
import { createPaymentDetail } from "../common/paymentDetail";
import { useCookies } from "react-cookie";

export default function PopupCreatePaymentDetail({closePopup, setLoading}) {
  const [authToken, setAuthToken] = useCookies(["auth"]);

  useEffect(() => {
    AOS.init();
  }, []);

  const onSubmit = async (e) => {
    try {
      const name = e.target.name.value;
      const number = e.target.number.value;
      const response = await createPaymentDetail(authToken.auth, name, number, true, setLoading)
      if(response){
        userSuccess("สำเร็จ", "เพิ่มบัญชีพร้อมเพย์สำเร็จ");
        closePopup(response);
      }
    } catch (error) {
      await userError("เกิดข้อผิดพลาด", error.message)
    } finally {
      setLoading(false)
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
      <div className="fixed z-4 bg-[#00000045] top-0 right-0 w-[100vw] h-[100vh] flex items-center justify-center">
        <form className=" container bg-[#1E293B] rounded-lg p-5 h-fit"
              data-aos="zoom-in"
              onSubmit={onSubmit}>
          <div className="flex justify-between items-center">
            <div className="text-[#f3aa60] text-xl font-bold">
              เพิ่มบัญชีพร้อมเพย์
            </div>
            <span className="material-symbols-outlined font-bold cursor-pointer"
                  onClick={() => closePopup(false)}>close</span>
          </div>

          <div className="text-white mb-3 mt-7 text-[18px]">ชื่อบัญชี*</div>
          <div
            className="grid gap-4 bg-[#171823] rounded-lg px-3 py-2"
            style={{ gridTemplateColumns: "30px 1fr" }}
          >
            <span className="material-symbols-outlined text-[28px] text-gray-300">
            <span className="material-symbols-outlined">
              perm_contact_calendar
            </span>
            </span>
            <input
              className="bg-tranparent text-[18px]"
              type="text"
              placeholder="account name"
              name="name"
              required
            />
          </div>

          <div className="text-white mb-3 mt-7 text-[18px]">เลขบัญชี*</div>
          <div
            className="grid gap-4 bg-[#171823] rounded-lg px-3 py-2"
            style={{ gridTemplateColumns: "30px 1fr" }}
          >
            <span className="material-symbols-outlined text-[28px] text-gray-300">
            <span className="material-symbols-outlined">
              tag
            </span>
            </span>
            <input
              className="bg-tranparent text-[18px]"
              type="text"
              placeholder="account number"
              name="number"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-[#246BFD] text-[18px] py-2 mt-10 cursor-pointer flex justify-center w-full items-center rounded-lg"
          >
            เพิ่มบัญชีพร้อมเพย์
          </button>

        </form>
      </div>
    </>
  );
}
