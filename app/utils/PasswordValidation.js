export const passwordValidator = (password, setErrorMassage) => {
  if (password.length < 6) {
    setErrorMassage("Password must be at least 6 characters long.");
    console.log("Password must be at least 6 characters long.");    
    return 0;
  }
  if (!/[A-Z]/.test(password)) {
    setErrorMassage("Password must contain at least one uppercase letter.");
    console.log("Password must contain at least one uppercase letter.");
    return 0;
  }
  if (!/[a-z]/.test(password)) {
    setErrorMassage("Password must contain at least one lowercase letter.");
    console.log("Password must contain at least one lowercase letter.");
    return 0;
  }

  return 1;
};
