let storeInstance = null;

export const setStore = store => {
  storeInstance = store;
};

export const getAccessToken = () => {
  if (storeInstance) {
    return storeInstance.getState().auth.accessToken;
  }
  return null;
};
