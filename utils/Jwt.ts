const jwt = require("jsonwebtoken");

export const isTokenExpired = (token: string) => {
  const decodedToken = jwt.decode(token);
  const currentTime = Date.now() / 1000;
  return decodedToken.exp < currentTime;
};
