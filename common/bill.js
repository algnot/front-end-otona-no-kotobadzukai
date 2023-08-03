import axios from "axios";
import { userError } from "./alert";

const backendPath = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getBills = async (token) => {
    try {
        const bills = await axios.get(`${backendPath}/bill`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
        return bills.data;
    } catch (error) {
        if (error.response) {
            userError("Error", error.response.data);
        }
        userError("Error", error.message);
    }
}

export const postBill = async (token, bill) => {
    
}