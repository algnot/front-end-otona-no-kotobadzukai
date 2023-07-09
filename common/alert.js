import Swal from "sweetalert2";

export const userError = async (title, text) => {
    await Swal.fire({
        icon: "error",
        title: title,
        text: text,
        confirmButtonColor: "#246BFD",
    });
}

export const userSuccess = async (title, text) => {
    await Swal.fire({
        icon: "success",
        title: title,
        text: text,
        confirmButtonColor: "#246BFD",
    });
}