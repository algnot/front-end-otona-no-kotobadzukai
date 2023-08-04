import { useState, useEffect } from "react";
import { userError } from "../../common/alert";
import { checkWantToLogin } from "../../common/user";
import Topbar from "../../components/Topbar";
import Select from "react-select";
import Swal from "sweetalert2";
import PopupCreatePaymentDetail from "../../components/PopupCreatePaymentDetail";

import PopupSeachUser from "../../components/PopupSeachUser";

export async function getServerSideProps(context) {
  const redirect = await checkWantToLogin(context.req.cookies.auth);
  return redirect;
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
  },
};
export default function Bill({ user, setLoading }) {
  const [paymentOption, setpaymentOption] = useState([]);
  const [onSearchUser, setOnSearchUser] = useState(false);
  const [onCreatePayment, setOnCreatePayment] = useState(false);
  const [billItemCount, setBillCount] = useState(1);

  const [paymentSelected, setPaymentSelected] = useState({});
  const [billUser, setBillUser] = useState(false);

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
        });
      }
      setpaymentOption(temp);
      setPaymentSelected(temp[0]);
    } else {
      setOnCreatePayment(true);
    }
  }, []);

  const onSubmit = async (e) => {
    try {
      const name = e.target.name.value;
      const user = billUser;
      const payment = paymentSelected.value;
      const serviceChargePercent = e.target.serviceChargePercent.value;
      const taxPercent = e.target.taxPercent.value;
      const billItems = [];
      for (let i = 0; i < billItemCount; i++) {
        const item = {
          name: e.target[`itemName-${i}`].value,
          amount: e.target[`itemAmount-${i}`].value,
          taxPercent: taxPercent,
          serviceChargePercent: serviceChargePercent
        };
        billItems.push(item);
      }
      const body = {
        name: name,
        user: user,
        items: billItems,
        payment: payment,
      }
      console.log(body);
      e.preventDefault();
    } catch (error) {
      userError("Error", error.message);
    }
  };

  const onRemoveUser = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "ต้องการลบผู้ถูกเรียกเก็บเงินหรือไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setBillUser(false);
      }
    });
  };

  const onAddPayment = (payment, isForce) => {
    if (isForce) {
      return (window.location.href = "/bill");
    }
    window.location.reload();
  };

  return (
    <>
      <div className="pb-5">
        {onSearchUser && (
          <PopupSeachUser
            closePopup={() => setOnSearchUser(false)}
            setLoading={setLoading}
            setUser={setBillUser}
          />
        )}
        {onCreatePayment && (
          <PopupCreatePaymentDetail
            closePopup={onAddPayment}
            setLoading={setLoading}
          />
        )}
        <Topbar href="/bill" showBack={true} title="สร้างรายการเรียกเก็บเงิน" />
        <form onSubmit={onSubmit} className="px-3">
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

          <div className="text-white mb-3 mt-8 text-[18px]">
            ผู้ถูกเรียกเก็บเงิน
          </div>

          {billUser && (
            <div className="flex justify-between items-center gap-4 bg-[#1E293B] rounded-lg px-5 py-2 mb-3">
              <div>
                {billUser.name} ({billUser.email})
              </div>
              <span
                className="material-symbols-outlined cursor-pointer"
                style={{ color: "red" }}
                onClick={onRemoveUser}
              >
                delete
              </span>
            </div>
          )}

          {!billUser && (
            <div
              className="flex justify-center items-center gap-4 bg-[#1E293B] rounded-lg px-3 py-2 cursor-pointer"
              onClick={() => setOnSearchUser(true)}
            >
              <span className="material-symbols-outlined text-[28px] text-gray-300">
                add
              </span>
              <span className="text-gray-300">เพิ่มผู้ถูกเรียกเก็บเงิน</span>
            </div>
          )}

          <div className="text-white mb-2 mt-8 text-[18px]">รายการ</div>

          <div
            className="grid gap-3"
            style={{ gridTemplateColumns: "2fr 1fr" }}
          >
            <span>ชื่อรายการ</span>
            <span>ราคา</span>

            {Array.from(Array(billItemCount).keys()).map((item, index) => {
              return (
                <>
                  <input
                    className="bg-tranparent text-[18px] bg-[#1E293B] rounded-lg px-3 py-2 w-full"
                    type="text"
                    name={`itemName-${index}`}
                    required
                  />
                  <input
                    className="bg-tranparent text-[18px] bg-[#1E293B] rounded-lg px-3 py-2 w-full"
                    type="number"
                    name={`itemAmount-${index}`}
                    min={0}
                    required
                  />
                </>
              );
            })}
          </div>

          <div className="flex items-center justify-start gap-3 ">
            <div
              className="flex justify-center items-center gap-4 bg-[#1E293B] rounded-lg px-3 mt-3 py-2 cursor-pointer"
              onClick={() => setBillCount(billItemCount + 1)}
            >
              <span className="material-symbols-outlined text-[28px] text-gray-300">
                add
              </span>
              <span className="text-gray-300">เพิ่มรายการ</span>
            </div>
            {billItemCount > 1 && (
              <div
                className="flex justify-center items-center gap-4 bg-[#1E293B] rounded-lg px-3 mt-3 py-2 cursor-pointer"
                onClick={() => setBillCount(billItemCount - 1)}
              >
                <span className="material-symbols-outlined text-[28px] text-gray-300">
                  delete
                </span>
                <span className="text-gray-300">ลบรายการ</span>
              </div>
            )}
          </div>

          <div className="text-white mb-3 mt-8 text-[18px]">
            Service Charge (%)
          </div>
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
                ...baseStyleSelect,
              }),
              menu: (provided, state) => ({
                ...provided,
                ...baseStyleSelect,
              }),
              singleValue: (provided, state) => ({
                ...provided,
                ...baseStyleSelect,
              }),
            }}
          />

          <button
            type="submit"
            className="bg-[#246BFD] text-[18px] py-2 mt-10 cursor-pointer flex justify-center w-full items-center rounded-lg"
          >
            สร้างรายการเรียกเก็บเงิน
          </button>
        </form>
      </div>
    </>
  );
}
