//Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
export const validPassword = new RegExp(
  "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
);
