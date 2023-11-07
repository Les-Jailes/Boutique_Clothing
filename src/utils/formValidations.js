const validateEmail = (email) => {
    if (email.length < 1) {
      return [false, "Email can't be be empty. Enter your email."];
    }
    if (!/^.+@.+\..+$/.test(email)) {
      return [false, "Invalid email format. Verify '@' and domain."];
    }
    return [true, ""];
  };
  
  export { validateEmail };