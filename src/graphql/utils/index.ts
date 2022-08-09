import jwt from "jsonwebtoken";

export const APP_SECRET = "092410x14120x1498140598435123";

export const verifyToken = (token: string) => {
  try {
    const authenticated = jwt.verify(token, APP_SECRET);
    return true;
  } catch (e) {
    return false;
  }
};

export enum Environment {
  DEVELOPMENT = "development",
  PRODUCTION = "production",
}
