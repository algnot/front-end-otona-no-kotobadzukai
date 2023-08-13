import Link from "next/link";
import { checkWantToLogin } from "../common/user";
import Navbar from "../components/Navbar";
import Topbar from "../components/Topbar";
import { useEffect, useState } from "react";
import { getBillsOwner } from "../common/bill";
import { useCookies } from "react-cookie";
import { userError } from "../common/alert";
import Head from "next/head";

export async function getServerSideProps(context) {
  const redirect = await checkWantToLogin(context.req.cookies.auth);
  return redirect;
}

const stateColor = {
  open: "bg-[#cccccc] text-black",
  waiting: "bg-[#f3aa60] text-black",
  paid: "bg-[#4CAF50] text-black",
  cancel: "bg-[#f44336] text-white",
};

export default function Bill({ user }) {
  const [authToken, setAuthToken] = useCookies(["auth"]);
  const [isLoadBill, setIsLoadBill] = useState(true);
  const [billList, setBillList] = useState([]);
  const [cursor, setCursor] = useState(0);

  useEffect(() => {
    onGetBills();
  }, []);

  const onGetBills = async () => {
    try {
      setIsLoadBill(true);
      const bills = await getBillsOwner(authToken.auth, cursor);
      if (!bills.data) {
        setCursor(-1);
        return;
      }
      const newBillList = [...billList, ...bills.data];
      setBillList(newBillList);
      setCursor(bills.nextCursor);
      setIsLoadBill(false);
    } catch (error) {
      userError("Error", error.message);
    }
  };

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
        <script src="https://cdn.lordicon.com/bhenfmcm.js"></script>
      </Head>
      <Navbar active="Bill" />
      <div className="pb-5">
        <Topbar showBack={false} title="Bills" />
        <Link
          href="/bill/create"
          className="px-4 bg-[#0C2237] flex justify-center items-center p-5 mt-4 rounded-lg cursor-pointer text-xl gap-2"
        >
          <span className="material-symbols-outlined">add</span>
          เรียกเก็บเงิน
        </Link>

        {billList.map((bill) => {
          return (
            <Link
              href={`/bill/${bill.ref}`}
              target="_blank"
              key={bill.id}
              className="flex items-center cursor-pointer hover:bg-[#0C2237] justify-between p-4 border-gray-600 border-b-[1px]"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-gray-500 text-[40px]">
                  person
                </span>
                <div>
                  <div className="font-bold text-[18px]">{bill.name}</div>
                  <div
                    className={`${
                      stateColor[bill.state]
                    } w-fit px-2 rounded-md text-[14px]`}
                  >
                    open
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-[16px]">
                  ฿ {bill.totalAmount}
                </div>
                <div className="text-gray-500 text-[14px]">
                  {bill.userBill[0].name}
                </div>
              </div>
            </Link>
          );
        })}

        {isLoadBill && (
          <center>
            <lord-icon
              src="https://cdn.lordicon.com/ymrqtsej.json"
              trigger="loop"
              colors="primary:#ffffff"
              style={{ width: "100px", height: "100px" }}
            />
          </center>
        )}

        {(cursor !== -1 && !isLoadBill) && (
          <div
            className="flex justify-center items-center p-4 border-gray-600 border-b-[1px] cursor-pointer hover:bg-[#0C2237]"
            onClick={onGetBills}
          >
            <span className="material-symbols-outlined text-gray-500 text-[40px]">
              expand_more
            </span>
          </div>
        )}
      </div>
      <div className="pt-6"></div>
    </>
  );
}
