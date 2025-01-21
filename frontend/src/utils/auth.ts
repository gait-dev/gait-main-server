export const getAccessToken = (): string | null => {
  console.log("getAccessToken")
  return localStorage.getItem('access_token');
};

export const getRefreshToken = (): string | null => {
  console.log("getRefreshToken")
  return localStorage.getItem('refresh_token');
};

export const setTokens = (access: string, refresh: string): void => {
  console.log("setToke")
  localStorage.setItem('access_token', access);
  localStorage.setItem('refresh_token', refresh);
};

export const removeTokens = (): void => {
  console.log("removeToken")
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};

export const isAuthenticated = (): boolean => {
  return !!getAccessToken();
};
