
export const validateEmail = (email) => {
  if (email.length === 0) {
    return [false, "Email can't be empty. Enter your email."];
  }
  const stricterEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!stricterEmailRegex.test(email)) {
    return [false, "Invalid email format."];
  }
  return [true, ""];
};

export const validatePassword = (password) => {
  if (password.length === 0) {
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
  if (password.length > 21) {
    return [false, "Password cannot be more than 16 characters long."];
  }
  return [true, ""];
};

