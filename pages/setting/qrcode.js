import { useCookies } from "react-cookie";
import { checkWantToLogin } from "../../common/user";
import Navbar from "../../components/Navbar";
import Topbar from "../../components/Topbar";
import Head from "next/head";
import { useState } from "react";
import Swal from "sweetalert2";
import { deletePaymentDetail } from "../../common/paymentDetail";
import { userSuccess } from "../../common/alert";

export async function getServerSideProps(context) {
  const redirect = await checkWantToLogin(context.req.cookies.auth);
  return redirect;
}

export default function qrcode({ user, setLoading }) {
  const [authToken] = useCookies(["auth"]);
  const [paymentDetail, setPaymentDetail] = useState(user.paymentDetail || []);

  const onDelete = async (id, e) => {
    try {
        Swal.fire({
            title: "คุณแน่ใจหรือไม่?",
            text: "คุณต้องการลบ QRCode นี้ใช่หรือไม่",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "ใช่, ลบ!",
            cancelButtonText: "ไม่, ยกเลิก!",
            reverseButtons: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await deletePaymentDetail(authToken.auth, id, setLoading)
                if (response) {
                    user.paymentDetail = user.paymentDetail.filter((item) => item.id !== id)
                    setPaymentDetail(user.paymentDetail)
                    userSuccess("ลบ QRCode สำเร็จ", "คุณได้ทำการลบ QRCode สำเร็จแล้ว")
                }
            }
        });
    } catch (error) {
        await userError("เกิดข้อผิดพลาด", error.message)
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
      <Navbar active="Setting" />
      <div className="pb-6">
        <Topbar href="/setting" title="QRCode ของฉัน" />
        <div className="mt-10 px-4">
          {paymentDetail.map((item) => (
            <div
              key={item.id}
              className="px-4 bg-[#0C2237] flex items-center justify-between p-5 mt-4 rounded-lg cursor-pointer text-xl gap-4"
            >
              <div className=" flex items-center gap-4">
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "26px" }}
                >
                  account_balance_wallet
                </span>
                <div className="">
                  <div className="font-bold">{item.name}</div>
                  <div className="text-sm text-gray-500">{item.ref}</div>
                </div>
              </div>

              <span className="material-symbols-outlined" style={{ color: "red" }} onClick={(e) => onDelete(item.id, e)}>
                delete
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
