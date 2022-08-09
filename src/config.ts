export enum Environment {
  DEVELOPMENT = "development",
  PRODUCTION = "production",
}

export const isCSRFEnabled = (): boolean => {
  return (
    process.env.NODE_ENV === Environment.PRODUCTION &&
    process.env.ENABLE_CSRF === "true"
  );
};

export const isPlaygroundEnabled = (): boolean => {
  return (
    process.env.NODE_ENV === Environment.DEVELOPMENT ||
    process.env.ENABLE_GRAPHQL_PLAYGROUND === "true"
  );
};

export const isCacheEnabled = (): boolean => {
  return (
    process.env.NODE_ENV === Environment.PRODUCTION &&
    process.env.ENABLE_CACHE === "true"
  );
};
