let notificationShown = false;

export const checkAuth = () => {
  const persistedAuth = localStorage.getItem('persist:auth');
  if (!persistedAuth && !notificationShown) {
    notificationShown = true;
    localStorage.removeItem('persist:auth');
    window.location.replace('/');
    return false;
  }
  return !!persistedAuth;
};

export const resetNotificationFlag = () => {
  notificationShown = false;
};
