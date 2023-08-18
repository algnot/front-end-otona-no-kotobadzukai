import Head from "next/head";
import { getBillsByRef } from "../../common/bill";
import Topbar from "../../components/Topbar";
import { useEffect, useState } from "react";

const stateColor = {
  open: "bg-[#cccccc] text-black",
  waiting: "bg-[#f3aa60] text-black",
  paid: "bg-[#4CAF50] text-black",
  cancel: "bg-[#f44336] text-white",
};
export async function getServerSideProps(context) {
  try {
    const { ref } = context.query;
    const bill = await getBillsByRef(ref);
    if (!bill) {
      return {
        redirect: {
          destination: "/bill",
          permanent: false,
        },
      };
    }
    return {
      props: {
        bill,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/bill",
        permanent: false,
      },
    };
  }
}

const activeClass = "bg-[#4737F7] rounded-lg px-3 py-2";
const inactiveClass = "cursor-pointer";

export default function BillDetail({ bill }) {
  useEffect(() => {}, []);

  return (
    <>
      <Head>
        <title>
          รายการเรียกเก็บเงิน {bill.name} ({bill.ref})
        </title>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </Head>
      <div className="pb-6">
        <Topbar href="/bill" showBack={false} title={bill.name} />
        <div className="px-3 mt-6">
          <a href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/pdf/preview/bill/${bill.ref}`} target="_blank" className="center text-[#246BFD] mx-[auto] text-[18px] py-2 mt-3 cursor-pointer flex justify-center w-fit items-center gap-1">
            <span className="material-symbols-outlined text-[#246BFD]">
              download
            </span>
            ดาวน์โหลดใบเสร็จ
          </a>
          <div className="mt-7">
            <span className="font-bold">สถานะ </span>
            <span
              className={`${stateColor[bill.state]} mt-7 rounded-md w-fit px-2`}
            >
              {bill.state}
            </span>
          </div>
          <div className="mt-4">
            <div className="font-bold">ยอดทั้งหมด</div>
            <div className="text-[30px]">
              ฿ {parseFloat(bill.totalAmount).toFixed(2)}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-3">
            <div className="bg-[#4737F7] p-7 rounded-xl">
              <span class="material-symbols-outlined text-3xl">
                arrow_circle_up
              </span>
              <div className="mt-3 text-[16px] text-gray-300">จ่ายแล้ว</div>
              <div className="text-[22px]">฿ {parseFloat(0).toFixed(2)}</div>
            </div>
            <div className="bg-[#0C2237] p-7 rounded-xl">
              <span class="material-symbols-outlined text-3xl">
                arrow_circle_down
              </span>
              <div className="mt-3 text-[16px] text-gray-300">คงเหลือ</div>
              <div className="text-[22px]">
                ฿ {parseFloat(bill.totalAmount).toFixed(2)}
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="font-bold">ผู้ถูกเรียกเก็บเงิน</div>
            <div className="flex items-center gap-2 bg-[#0C2237] py-3 px-4 mt-3 rounded-xl">
              <span className="material-symbols-outlined text-gray-500 text-[40px]">
                person
              </span>
              <div>
                {bill.userBill[0].name} ({bill.userBill[0].email})
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="font-bold">ผู้เรียกเก็บเงิน</div>
            <div className="flex items-center gap-2 bg-[#0C2237] py-3 px-4 mt-3 rounded-xl">
              <span className="material-symbols-outlined text-gray-500 text-[40px]">
                person
              </span>
              <div>
                {bill.owner.name} ({bill.owner.email})
              </div>
            </div>
          </div>

          <div className="mt-4">
            <div className="font-bold">รายการ</div>
            {bill.billItem.map((item) => {
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-[#0C2237] py-3 px-4 mt-3 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-gray-500 text-[40px]">
                      format_list_bulleted
                    </span>
                    <div>
                      <div>
                        {item.name} (฿ {parseFloat(item.unitAmount).toFixed(2)}{" "}
                        x {item.quantity})
                      </div>
                      {item.serviceChargePercent > 0 && (
                        <div className="text-gray-500 text-[14px]">
                          Service Charge ({item.serviceChargePercent}%): ฿{" "}
                          {parseFloat(item.totalServiceCharge).toFixed(2)}
                        </div>
                      )}
                      {item.taxPercent > 0 && (
                        <div className="text-gray-500 text-[14px]">
                          Vat ({item.taxPercent}%): ฿{" "}
                          {parseFloat(item.totalTax).toFixed(2)}
                        </div>
                      )}
                    </div>
                  </div>
                  <div>฿ {parseFloat(item.totalAmount).toFixed(2)}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
