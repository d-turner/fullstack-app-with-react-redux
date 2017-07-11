// json replies
export const loginSuccess = { status: 'Successful Login' };
export const loginFailed = { error: 'Failed Login' };
export const badParameters = { error: 'Bad Parameters' };
export const somethingBad = { error: 'Something Went Wrong', status: 'Unknown Error' };
export const loggedIn = { status: 'Logged In' };
export const loggedOut = { status: 'Logged Out' };
export const emailExists = { error: 'Email already in use' };
export const noUserFound = { error: 'User not found' };
export const wrongPassword = { error: 'Wrong Password' };
export const registerSuccess = { status: 'Registration Successful' };
export const registerFailed = { error: 'Registration Failed' };

// status codes
export const good = 200;
export const found = 302;
export const bad = 400;
export const noAuth = 401;
export const forbidden = 403;
export const conflict = 409;
export const unprocessable = 422;
export const error = 500;
