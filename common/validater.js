

export const valiadteEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

export function numberWithCommas(x) {
    x = parseFloat(x).toFixed(2);
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}