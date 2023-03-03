export function validateSignUpForm(formData) {
  let errors = {};

  if (!formData.username) {
    errors.username = "Username is required";
  }

  if (!formData.password) {
    errors.password = "Password is required";
  }

  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  if (!formData.confirmPassword) {
    errors.confirmPassword = "Confirm password is required";
  }

  if (/\s/.test(formData.username)) {
    errors.username = "Email address must not contain spaces";
  }

  if (/\s/.test(formData.password)) {
    errors.password = "Password must not contain spaces";
  }

  if (/\s/.test(formData.confirmPassword)) {
    errors.confirmPassword = "Confirm password must not contain spaces";
  }

  return errors;
}
// TESTING
// const result = validateSignUpForm({
//   username: "victor",
//   password: "abc",
//   confirmPassword: "ab",
// });

// console.log(result);
