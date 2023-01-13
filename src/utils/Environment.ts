export const isProduction = (): boolean => {
  return process.env.NODE_ENV === "production";
}

export const isDevelopment = (): boolean => {
  return !isProduction()
}

export const isWebOrExtensionVersion = (): string => {
  const buildTarget = process.env.REACT_APP_BUILD_TARGET as "web" | "extension" | undefined;
  return buildTarget || "web";
}

export const getBrowserName = (): string => {
  let userAgent = navigator.userAgent;
  if (userAgent.match(/chrome|chromium|crios/i)) {
    return "chrome";
  } else if (userAgent.match(/firefox|fxios/i)) {
    return "firefox";
  } else {
    return "other"
  }
}