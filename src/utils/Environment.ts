export const isProduction = (): boolean => {
  return process.env.NODE_ENV === "production";
}

export const isDevelopment = (): boolean => {
  return !isProduction()
}