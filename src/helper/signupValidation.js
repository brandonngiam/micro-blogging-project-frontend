export function checkUserName(username) {
  switch (true) {
    case username.length < 5:
      return "Username cannot be shorter than 5 characters";
    case username.length > 32:
      return "Username cannot be longer than 32 characters";
    case /.*[A-Z]+.*/.test(username):
      return "Uppercase characters not allowed";
    case !/^[a-z0-9.\-_]*$/.test(username):
      return "Unauthorized characters";
    default:
      return "";
  }
}

export function checkPassword(password) {
  switch (true) {
    case password.length < 8:
      return "Password cannot be shorter than 8 characters";
    case password.length > 128:
      return "Password cannot be longer than 128 characters";
    case !/.*[*@!#%&()^~{}.,$%^]+.*/.test(password):
      return "At least one special character required";
    default:
      return "";
  }
}
