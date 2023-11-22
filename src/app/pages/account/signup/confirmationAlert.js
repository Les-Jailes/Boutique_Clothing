import Swal from 'sweetalert2';

export function showAccountAlreadyExistsAlert(router) {
  Swal.fire({
    title: 'There is already an account created with this email. Do you want to log in?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, go to login page',
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: 'You will be redirected to the login page',
        icon: 'success',
      });
      router.push('/pages/account/login');
    }
  });
}

export function showAccountAlreadyExistsAlertSingIn(router) {
  Swal.fire({
    title: 'This email does not have an account. Do you want to sign up first?',
    icon: 'warning',
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'OK',
  }).then((result) => {
    if (result.isConfirmed) {
      router.push('/pages/account/signup');
    }
  });
}

export function showAccountCreatedAlert() {
    Swal.fire({
        title: "Account Created",
        text: "You will be redirected to the login page",
        icon: "success"
      });
}

export function showErrorMessage(){
    Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please fill out all fields correctly",
      });
}