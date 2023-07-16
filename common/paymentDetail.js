import axios from "axios";
import { userError } from "./alert";

export const createPaymentDetail = async (
  authToken,
  name,
  number,
  isPromptPay,
  setLoading = (l) => {}
) => {
  try {
    setLoading(true);
    //   check number not contain any 0-9 use regex
    if (!/^[0-9]*$/.test(number)) {
        throw new Error("เลขบัญชีต้องเป็นตัวเลขเท่านั้น");
    }
    const paymentDetail = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/payment-detail`,
      {
        name: name,
        number: number,
        isPromptpay: isPromptPay,
      },
      {
        headers: {
          Authorization: `${authToken}`,
        },
      }
    );
    setLoading(false);
    return paymentDetail.data;
  } catch (error) {
    if (error.response) {
      setLoading(false);
      return userError("Error", error.response.data);
    }
    userError("Error", error.message);
  }
};
