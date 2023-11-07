const validateEmail = (email) => {
    if (email.length < 1) {
      return [false, "Email can't be be empty. Enter your email."];
    }
    if (!/^.+@.+\..+$/.test(email)) {
      return [false, "Invalid email format. Verify '@' and domain."];
    }
    return [true, ""];
  };
  const validatePassword = (password) => {
    if (password.length < 1) {
      return [false, "Password cannot be empty. Enter your password."];
    }
    if (password.length < 8) {
      return [false, "Password must be at least 8 characters long."];
    }
    if (!/[a-z]/.test(password)) {
      return [false, "Password must contain at least one lowercase letter."];
    }
    if (!/[A-Z]/.test(password)) {
      return [false, "Password must contain at least one uppercase letter."];
    }
    if (!/\d/.test(password)) {
      return [false, "Password must contain at least one number."];
    }
    return [true, ""];
  };
  export { validateEmail,validatePassword };