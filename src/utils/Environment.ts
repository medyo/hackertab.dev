export const isProduction = (): boolean => {
  return process.env.NODE_ENV === "production";
}

export const isDevelopment = (): boolean => {
  return !isProduction()
}

export const isWebOrExtensionVersion = (): string => {
  const webBuild = process.env.REACT_APP_WEB_BUILD as string;

  return webBuild === "0" ? "web" : "extension"
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