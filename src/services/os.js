const getOSMode = () => {
  let osMode = 'light';
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    osMode = 'dark';
  }

  return osMode;
}


export {
  getOSMode,
}
