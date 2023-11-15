
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

  export const validateTextField = (text, typeOfText) =>{
    if(!text || text === ""){
        return [false, typeOfText + " can not be empty"];
    }
    if(text.length>=25){
      return [false, typeOfText + " can not be more than 16 characters long."];
    }
    if (text.length < 3) {
      return [false, typeOfText + " must be at least 3 characters long."];
    }
    const regex = /^[A-Za-z\s]+$/;
    if (!regex.test(text)) {
      return [false, typeOfText + " should only contain letters and spaces."];
    }
    return [true,""];
  };

export const validateNumberField = (ci, type) => {
  if (!ci || ci === "") {
    return [false, type + " field can not be empty."];
  }
  if(ci.length>=16){
    return [false, type + " can not be more than 16 characters long."];
  }
  if(ci.charAt(0) == "0"){
    return [false, type + " not valid"];
  }
  return [true, ""];
}

  export const validateCiField = (ci) => {
    if (!ci || ci === "") {
      return [false, "CI field can not be empty."];
    }
    if (!/^\d+$/.test(ci)) {
      return [false, "CI must contain only numbers."];
    }  
    if (ci.length >= 16) {
      return [false, "CI can not be more than 16 characters long."];
    }    
    if (ci.charAt(0) === "0") {
      return [false, "CI not valid"];
    }    
    return [true, ""];
  }

