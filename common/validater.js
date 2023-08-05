

export const valiadteEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}