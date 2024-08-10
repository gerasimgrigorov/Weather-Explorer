const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidUsername = (username) => {
  return username && username.length >= 3;
};

const isValidPassword = (password) => {
  return password && password.length >= 8;
};

module.exports = {
  isValidEmail,
  isValidUsername,
  isValidPassword
};
