
export const searchUserByEmail = async (email) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/search/user?email=${email}`);
    const data = await res.json();
    return data.data;
}