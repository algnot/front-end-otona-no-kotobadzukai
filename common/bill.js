import axios from "axios";

const backendPath = process.env.NEXT_PUBLIC_BACKEND_URL;
export const getBillsOwner = async (token, cursor=0) => {
    try {
        const bills = await axios.get(`${backendPath}/bill/my-bill-owner?size=5&cursor=${cursor}`, {
        headers: {
            Authorization: `${token}`,
        },
        });
        return bills.data;
    } catch (error) {
        new Error(error.message);
    }
}

export const postBill = async (token, bill) => {
    try {
        const newBill = await axios.post(`${backendPath}/bill`, bill, {
            headers: {
                Authorization: `${token}`,
            },
        })
        return newBill.data;
    } catch (error) {
        new Error(error.message);
    }
}

export const getBillsByRef = async (ref) => {
    try {
        const bills = await axios.get(`${backendPath}/bill?ref=${ref}`);
        return bills.data;
    } catch (error) {
        new Error(error.message);
    }
}