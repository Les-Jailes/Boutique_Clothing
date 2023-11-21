import Swal from 'sweetalert2';

export function showErrorMessage(title, text){
    Swal.fire({
        icon: "error",
        title: title,
        text: text,
      });
}