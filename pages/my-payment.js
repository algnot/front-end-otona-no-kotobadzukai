import Head from "next/head";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Topbar from "../components/Topbar";
import { checkWantToLogin } from "../common/user";
import PopupCreatePaymentDetail from "../components/PopupCreatePaymentDetail";

export async function getServerSideProps(context) {
  const redirect = await checkWantToLogin(context.req.cookies.auth);
  return redirect;
}
export default function Payment({ user, setLoading }) {
  const [isCreatePayment, setIsCreatePayment] = useState(false);
  const [paymentDetail, setPaymentDetail] = useState(user.paymentDetail || []);

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </Head>
      {isCreatePayment && (
        <PopupCreatePaymentDetail
          closePopup={() => setIsCreatePayment(false)}
          setLoading={setLoading}
        />
      )}
      <div>
        <Navbar active="Payment" />
        <div className="pb-6">
          <Topbar href="/payment" showBack={false} title="My QRCode" />
          <div className="px-4">
            <div
              className="px-4 bg-[#0C2237] flex justify-center items-center p-5 mt-4 rounded-lg cursor-pointer text-xl gap-2"
              onClick={() => setIsCreatePayment(true)}
            >
              <span className="material-symbols-outlined">add</span>
              เพิ่มบัญชีพร้อมเพย์ของฉัน
            </div>
            {paymentDetail.map((item) => (
              <a
                key={item.id}
                href={`${process.env.NEXT_PUBLIC_PROMPTPAY_GATEWAT_URL}/${item.number}`}
                target="_blank"
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
                    <div className="text-sm text-gray-500">{item.number}</div>
                  </div>
                </div>
                {item.isPromptpay && (
                  <div className="text-sm flex justify-center items-center gap-2 bg-green-900 rounded-xl px-2 py-1">
                    สร้าง QRCode ได้
                    <span
                      class="material-symbols-outlined"
                      style={{ fontSize: "20px" }}
                    >
                      verified
                    </span>
                  </div>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
