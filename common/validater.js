

export const valiadteEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}