import { useState, useEffect } from "react";
import { userError } from "../../common/alert";
import { checkWantToLogin } from "../../common/user";
import Topbar from "../../components/Topbar";
import Select from 'react-select';

import PopupSeachUser from "../../components/PopupSeachUser";

export async function getServerSideProps(context) {
  const redirect = await checkWantToLogin(context.req.cookies.auth);
  return redirect;
}
export default function Bill({ user, setLoading }) {
  const [paymentOption, setpaymentOption] = useState([]);
  const [paymentSelected, setPaymentSelected] = useState({});
  const [billItems, setBillItems] = useState([])
  const [billUser, setBillUser] = useState({});
  const [onSearchUser, setOnSearchUser] = useState(false)

  useEffect(() => {
    if (user.paymentDetail.length > 0) {
        let temp = [];    
        for (let payment of user.paymentDetail) {
            temp.push({
                value: {
                    name: payment.name,
                    number: payment.number,
                    isPromptpay: payment.isPromptpay,
                },
                label: `${payment.name} (${payment.number})`,
            })
        }
        setpaymentOption(temp);
        setPaymentSelected(temp[0]);
    }

  },[])

  const onSubmit = async (e) => {
    try {
        e.preventDefault();
    } catch (error) {
        userError("Error", error.message);
    }
  }

  const baseStyleSelect = {
    backgroundColor: "#1E293B",
    color: "#fff",
    fontSize: "18px",
    fontWeight: "500",
    cursor: "pointer",
    "&:hover": {
        backgroundColor: "#12294F",
        borderColor: "#1E293B",
    }
  }

  return (
    <>
      <div className="pb-5">
        {
            onSearchUser && (
                <PopupSeachUser closePopup={() => setOnSearchUser(false)} setLoading={setLoading}/>
            )
        }
        <Topbar href="/bill" showBack={true} title="สร้างรายการเรียกเก็บเงิน" />
        <form onSubmit={onSubmit}>
            <div className="text-white mb-3 mt-8 text-[18px]">ชื่อบิล</div>
            <div
                className="grid gap-4 bg-[#1E293B] rounded-lg px-3 py-2"
                style={{ gridTemplateColumns: "30px 1fr" }}
            >
                <span className="material-symbols-outlined text-[28px] text-gray-300">
                    note
                </span>
                <input
                    className="bg-tranparent text-[18px]"
                    type="text"
                    placeholder="ค่ากะเพรา"
                    name="name"
                    required
                />
            </div>

            <div className="text-white mb-3 mt-8 text-[18px]">ผู้ถูกเรียกเก็บเงิน</div>
            <div className="flex justify-center items-center gap-4 bg-[#1E293B] rounded-lg px-3 py-2 cursor-pointer"
                 onClick={() => setOnSearchUser(true)}
            >
                <span className="material-symbols-outlined text-[28px] text-gray-300">
                    add
                </span>
                <span className="text-gray-300">เพิ่มผู้ถูกเรียกเก็บเงิน</span>
            </div>

            <div className="text-white mb-3 mt-8 text-[18px]">รายการ</div>
            <div className="flex justify-center items-center gap-4 bg-[#1E293B] rounded-lg px-3 py-2 cursor-pointer">
                <span className="material-symbols-outlined text-[28px] text-gray-300">
                    add
                </span>
                <span className="text-gray-300">เพิ่มรายการ</span>
            </div>

            <div className="text-white mb-3 mt-8 text-[18px]">Service Charge (%)</div>
            <div
                className="grid gap-4 bg-[#1E293B] rounded-lg px-3 py-2"
                style={{ gridTemplateColumns: "30px 1fr" }}
            >
                <span className="material-symbols-outlined text-[28px] text-gray-300">
                    percent
                </span>
                <input
                    className="bg-tranparent text-[18px]"
                    type="number"
                    name="serviceChargePercent"
                    defaultValue={0}
                    min={0}
                    max={100}
                    required
                />
            </div>

            <div className="text-white mb-3 mt-8 text-[18px]">Tax (%)</div>
            <div
                className="grid gap-4 bg-[#1E293B] rounded-lg px-3 py-2"
                style={{ gridTemplateColumns: "30px 1fr" }}
            >
                <span className="material-symbols-outlined text-[28px] text-gray-300">
                    percent
                </span>
                <input
                    className="bg-tranparent text-[18px]"
                    type="number"
                    name="taxPercent"
                    defaultValue={0}
                    min={0}
                    max={100}
                    required
                />
            </div>

            <div className="text-white mb-3 mt-8 text-[18px]">การชำระเงิน</div>
            <Select
                value={paymentSelected}
                onChange={(e) => setPaymentSelected(e)}
                closeMenuOnScroll={true}
                options={paymentOption}
                styles={{
                    color: "#fff",
                    control: (provided, state) => ({
                        ...provided,
                        ...baseStyleSelect,
                        border: "none",
                        borderRadius: "10px",
                        padding: "0.5rem 0.75rem",
                    }),
                    option: (provided, state) => ({
                        ...provided,
                        ...baseStyleSelect
                    }),
                    menu: (provided, state) => ({
                        ...provided,
                        ...baseStyleSelect
                    }),
                    singleValue: (provided, state) => ({
                        ...provided,
                        ...baseStyleSelect
                    }),
                }}
            />

        </form>

      </div>
    </>
  );
}
