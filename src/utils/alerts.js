import Swal from 'sweetalert2';

export function showErrorMessage(title, text){
    Swal.fire({
        icon: "error",
        title: title,
        text: text,
      });
}

export function showAlertMessage(title, text){
  Swal.fire({
      icon: "warning",
      title: title,
      text: text,
    });
}

export function showAlertMessageAutomatically(title, text){
  Swal.fire({
    position: "bottom-end",
    icon: "warning",
    title: title,
    text: text,
    showConfirmButton: false,
    timer: 1500
  });
}