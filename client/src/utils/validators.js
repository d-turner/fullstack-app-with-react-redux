export function validateName(name) {
  if (name !== '' && name !== undefined && name !== null) return true;
  return false;
}

export function validateEmail(email) {
  // regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const result = re.test(email);
  return result;
}

export function validatePassword(password) {
  const numberReg = /\d+/g;
  const upperReg = /[A-Z]+/g;
  if (password && password.length >= 8 && numberReg.test(password) && upperReg.test(password)) {
    return true;
  }
  return false;
}

export function validateConfirm(password, confirm) {
  if (password === confirm) return true;
  return false;
}
