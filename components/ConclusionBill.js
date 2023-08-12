import Aos from "aos";
import Head from "next/head";
import React, { useEffect } from "react";
import { numberWithCommas } from "../common/validater";
import { useCookies } from "react-cookie";
import { userError, userSuccess } from "../common/alert";
import { postBill } from "../common/bill";

export default function ConclusionBill({
  payload = {
    name: "",
    user: {
      name: "",
      email: "",
    },
    payment: {
      name: "",
      number: "",
      isPromptpay: true,
    },
    items: [],
  },
  closePopup,
}) {
  const [authToken, setAuthToken] = useCookies(["auth"]);

  useEffect(() => {
    Aos.init();
  }, []);

  let total = payload.items.reduce((a, b) => a + parseFloat(b.amount * b.quantity), 0);
  let serviceCharge = (total * payload.items[0].serviceChargePercent) / 100;
  let tax = ((total + serviceCharge) * payload.items[0].taxPercent) / 100;

  const onSubmit = async () => {
    try {
      await postBill(authToken.auth, payload);
      await userSuccess("Success", "สร้างรายการสำเร็จ");
      window.location.href = "/bill";
    } catch (error) {
      userError("Error", error.message);
    }
  }

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </Head>
      <div className="fixed z-10 bg-[#00000045] top-0 right-0 w-[100vw] h-[100vh] flex items-center justify-center px-3">
        <div
          className="container bg-[#1E293B] rounded-lg p-5 h-fit"
          data-aos="zoom-in"
        >
          <div className="flex justify-between items-center">
            <div className="text-[#f3aa60] text-xl font-bold">
              ยืนยันการสร้างรายการ
            </div>
            <span
              className="material-symbols-outlined font-bold cursor-pointer"
              onClick={closePopup}
            >
              close
            </span>
          </div>

          <div className="mt-5">
            เรียกเก็บเงินที่{" "}
            <span className="bg-[rgb(24,26,32)] px-2 rounded-lg">
              {payload.user.name}
            </span>{" "}
          </div>
          <div className="mt-2">
            อีเมล{" "}
            <span className="bg-[rgb(24,26,32)] px-2 rounded-lg">
              {payload.user.email}
            </span>{" "}
          </div>
          <div className="mt-2">
            ช่องทางการชำระเงินพร้อมเพย์{" "}
            <span className="bg-[rgb(24,26,32)] px-2 rounded-lg">
              {payload.payment.number}
            </span>{" "}
          </div>

          <div className="mt-5 text-[#f3aa60]">รายการ</div>
          {payload.items.map((item, index) => (
            <div key={item.name} className="flex justify-between items-center">
              <div className="font-bold">{item.name} x{item.quantity} </div>
              <div className="font-bold">
                {numberWithCommas(parseFloat(item.amount * item.quantity).toFixed(2))} บาท
              </div>
            </div>
          ))}

          <div className="mt-5 text-[#f3aa60]">สรุปยอด</div>
          <div className="flex justify-between items-center">
            <div className="font-bold">ยอดรวม</div>
            <div className="font-bold">
              {numberWithCommas(total.toFixed(2))} บาท
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="font-bold">
              Service Charge ({payload.items[0].serviceChargePercent} %)
            </div>
            <div className="font-bold">
              {numberWithCommas(serviceCharge.toFixed(2))} บาท
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="font-bold">
              Tax ({payload.items[0].taxPercent} %)
            </div>
            <div className="font-bold">
              {numberWithCommas(tax.toFixed(2))} บาท
            </div>
          </div>

          <div className="flex justify-between items-center mt-4 text-xl">
            <div className="font-bold">ทั้งหมด</div>
            <div className="font-bold">
              {numberWithCommas(
                parseFloat(total + tax + serviceCharge).toFixed(2)
              )}{" "}
              บาท
            </div>
          </div>

          {/* <center className="text-[#246BFD] mx-[auto] text-[18px] py-2 mt-3 cursor-pointer flex justify-center w-fit items-center gap-1">
            <span className="material-symbols-outlined text-[#246BFD]">download</span>
            ดาวน์โหลดใบเสร็จ
          </center> */}
          <div className="bg-[#246BFD] mb-2 text-[18px] py-2 mt-4 cursor-pointer flex justify-center w-full items-center rounded-lg"
               onClick={onSubmit}>
            สร้างใบเสร็จ
          </div>
          * ระบบไม่อนุญาติให้แก้ไขรายการหลังจากสร้างใบเสร็จแล้ว
        </div>
      </div>
    </>
  );
}
