import { getLogger } from '../core/log';

const CLIENT_ID = "b97995d76ed0457b8f5f4817e6ae076a";
const REDIRECT_URI = "https://auth.expo.io/@anonymous/React-Off-App-3ea2425f-825d-4269-95bb-1823e138c404";
const SPOTIFY_API_BASE_URL =  "https://api.spotify.com";
const SPOTIFY_ACCOUNTS_URL = "https://accounts.spotify.com";
const TOKEN_AUTHORIZATION = "Basic Yjk3OTk1ZDc2ZWQwNDU3YjhmNWY0ODE3ZTZhZTA3NmE6MGEzYzE4MDEyZDc3NDlkMGExNGUyOTJmZWE2MjhiMTg=";
const apiUrl = 'http://192.168.43.60:7005';
const httpLocalApiUrl = `http://${apiUrl}`;
const log = getLogger('API');
const defaultHeaders = {
  'Accept':'application/json',
  'Content-Type': 'application/x-www-form-urlencoded',
  Authorization : ''
};
let token;

const buildHeaders = () => {
  const headers = { ...defaultHeaders };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  else {
    headers.Authorization = TOKEN_AUTHORIZATION;
  }

  log("Headers:" + headers.Authorization);
  return headers;
};

const withErrorHandling = fetchPromise => fetchPromise
  .then(response => Promise.all([response.ok, response.json()]))
  .then(([responseOk, responseJson]) => {
    log("Response json" + responseJson);
    if (responseOk) {
      return responseJson;
    }
    else
      throw new Error(responseJson);
  });

const tracksHandling = fetchPromise => fetchPromise
  .then(response => Promise.all([response.ok, response.json()]))
  .then(([responseOk, responseJson]) => {
    log("Tracks" + responseJson); 
    if(responseOk) {
      return responseJson;
    } 
    else throw new Error(responseOk);
  });

  
export const setToken = value => {
  token = value;
}; 

export const httpGet = path =>
  withErrorHandling(
    fetch(`${httpLocalApiUrl}/${path}`, {
      method: 'GET',
      headers: buildHeaders(),
    })
  );

export const httpPostlogin = (path, payload) =>
  withErrorHandling(
    fetch(`${apiUrl}/${path}`, {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  );

export const httpPostTrack = (path, payload) =>
  withErrorHandling(
    fetch(`${apiUrl}/${path}`, {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  );

export const spotifyPost = (path, payload) =>
  withErrorHandling(
    fetch(`${SPOTIFY_ACCOUNTS_URL}/${path}`, {
      method: 'POST',
      headers: buildHeaders(),
    })
  );

export const httpGetTracks = (path) =>  
  tracksHandling(
    fetch(`${SPOTIFY_API_BASE_URL}/${path}`, {
      method: 'GET',
      headers: buildHeaders(),
    })
  );

export const httpGetChart = (path) => 
  withErrorHandling(
    fetch(`${apiUrl}/${path}`, {
      method: 'GET',
    })
  );