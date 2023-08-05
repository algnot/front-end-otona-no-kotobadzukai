import Head from "next/head";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";

export default function PopupShowPayment({
  payment,
  closePopup,
  editMode = false,
}) {
  const [amonut, setAmonut] = useState(0);

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
        />
      </Head>
      <div className="fixed z-10 bg-[#00000045] top-0 right-0 w-[100vw] h-[100vh] flex items-center justify-center px-3">
        <div
          className="container bg-[#1E293B] rounded-lg p-5 h-fit"
          data-aos="zoom-in"
        >
          <div className="flex justify-between items-center">
            <div className="text-[#f3aa60] text-xl font-bold">
              QRCode บัญชี {payment.name}
            </div>
            <span
              className="material-symbols-outlined font-bold cursor-pointer"
              onClick={() => closePopup(false)}
            >
              close
            </span>
          </div>

          <div className="bg-white my-4 rounded-lg overflow-hidden">
            <div className="bg-[#113566] flex justify-center items-center">
              <img src="/asset/thai-qr-payment.png" className="h-[60px]" />
            </div>
            <div className="flex justify-center items-center">
              <img
                className="w-[400px]"
                src={`${process.env.NEXT_PUBLIC_PROMPTPAY_GATEWAT_URL}/api?id=${payment.number}&amount=${amonut}`}
              />
            </div>
          </div>

          {editMode && (
            <>
              <div className="text-white mb-3 mt-7 text-[13px]">
                * ไม่สามารถแก้ไข QRCode ของคุณได้แต่สามารถลบได้
              </div>

              <div
                className="grid gap-4 bg-[#171823] rounded-lg px-3 py-2 mt-3"
                style={{ gridTemplateColumns: "30px 1fr" }}
              >
                <span className="material-symbols-outlined text-[28px] text-gray-300">
                  <span className="material-symbols-outlined">
                    tag
                  </span>
                </span>
                <input
                  className="bg-tranparent text-[18px] text-gray-300"
                  value={payment.number}
                  disabled
                />
              </div>
            </>
          )}

          {!editMode && (
            <>
              <div className="text-white mb-3 text-[18px]">ระบุจำนวนเงิน</div>

              <div
                className="grid gap-4 bg-[#171823] rounded-lg px-3 py-2 mt-3"
                style={{ gridTemplateColumns: "30px 1fr" }}
              >
                <span className="material-symbols-outlined text-[28px] text-gray-300">
                  <span className="material-symbols-outlined">tag</span>
                </span>
                <input
                  className="bg-tranparent text-[18px]"
                  type="number"
                  placeholder="account number"
                  name="number"
                  value={amonut}
                  onChange={(e) => setAmonut(e.target.value)}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
