const USER_KEY = "user_key";
const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const REFRESH_TOKEN_TIMESTAMP_KEY = "refresh_token_timestamp";
const TOKEN_EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 1 jour en millisecondes

export const saveRefreshToken = (token: string) => {
  localStorage.setItem(REFRESH_TOKEN_KEY, token);
  localStorage.setItem(
    REFRESH_TOKEN_TIMESTAMP_KEY,
    Date.now().toString() // Timestamp actuel
  );
};


export const getValidRefreshToken = (): string | null => {
  const token = localStorage.getItem(REFRESH_TOKEN_KEY);
  const timestamp = localStorage.getItem(REFRESH_TOKEN_TIMESTAMP_KEY);
  console.log("getRefreshToken")

  if (!token || !timestamp) {
    return null; // Pas de token ou pas de timestamp
  }

  const tokenAge = Date.now() - parseInt(timestamp, 10);

  if (tokenAge > TOKEN_EXPIRATION_TIME) {
    // Token expiré
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_TIMESTAMP_KEY);
    return null;
  }

  return token; // Token valide
};


export const getAccessToken = (): string | null => {
  console.log("getAccessToken")
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const getRefreshToken = (): string | null => {
  return getValidRefreshToken();
};

export const setTokens = (user: string, access: string, refresh: string): void => {
  console.log("setToken")
  if(user != "")
    localStorage.setItem(USER_KEY, user);
  localStorage.setItem(ACCESS_TOKEN_KEY, access);
  saveRefreshToken(refresh)
};

export const removeTokens = (): void => {
  console.log("removeToken")
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_TIMESTAMP_KEY);
};

export const isAuthenticated = (): boolean => {
  return !!getAccessToken();
};


export const getUserPk = (): number =>{
  const pk = localStorage.getItem(USER_KEY);
  if(pk)
    return parseInt(pk);
  return -1;
}