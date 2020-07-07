import React, { useEffect, useCallback, useReducer } from 'react';
import { AsyncStorage } from 'react-native';
import { getLogger, httpPost, setToken } from '../core';
import { Provider } from './AuthContext';
import { spotifyPost, httpPostlogin } from '../core/api';

const log = getLogger('AuthStore');

const TOKEN_KEY = 'TOKEN';
const SET_TOKEN = 'SET_TOKEN';
const SIGN_IN_STARTED = 'SIGN_IN_STARTED';
const SIGN_IN_SUCCEEDED = 'SIGN_IN_SUCCEEDED';
const SIGN_IN_FAILED = 'SIGN_IN_FAILED';

const initialState = {
  token: null,
  signInError: null,
  signInInProgress: false,
};

function reducer(state, action) {
  log('reducer', action);
  switch (action.type) {
    case SET_TOKEN:
      return { ...state, token: action.payload };
    case SIGN_IN_STARTED:
      return { ...state, signInError: null, signInInProgress: true };
    case SIGN_IN_SUCCEEDED:
      return { ...state, token: action.payload, signInInProgress: false };
    case SIGN_IN_FAILED:
      return { ...state, signInError: action.payload.error, signInInProgress: false };
    default:
      return state;
  }
}

export const AuthStore = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onLoadToken = useCallback(async () => {
    log('loadToken...');
    let token = null;
    try {
      const value = await AsyncStorage.getItem(TOKEN_KEY);
      token = value || null;
      log('loadToken succeeded', token, value);
    } catch(error) {
      log('loadToken error', error);
    }
    setToken(token);
    dispatch({ type: SET_TOKEN, payload: { token } });
    return Promise.resolve(token);
  }, []);

  const onLoginSpotify = useCallback(async (grantType) => {
    log('grant type spotify' + grantType);
    dispatch({ type: SIGN_IN_STARTED });
    return spotifyPost('api/token?grant_type=client_credentials', { grantType })
    .then(tokenHolder => {
      log('Spotify token response ' + tokenHolder.access_token);
      let token = tokenHolder.access_token;
      log('Token ' + token);
      setToken(token);
      dispatch({ type: SIGN_IN_SUCCEEDED, payload: token });
      AsyncStorage.setItem(TOKEN_KEY, token)
        .catch(error => {
          log('saveToken error', error);
        });
      return token;
    })
    .catch(error => {
      dispatch({ type: SIGN_IN_FAILED, payload: { error }});
      return Promise.reject(error);
  })
  }, []);

  const onSignIn = useCallback(async (email, password) => {
    log('sign in ' + email);
    return httpPostlogin('login', { email, password })
      .then(loginResponse => {
        if(loginResponse.length > 0) 
          return loginResponse;
        else 
          throw "Invalid credentials";
      })
      .catch(error => {
        log('sign in error ' + error);
        return Promise.reject(error);
    })
  }, []);

  const onSignOut = useCallback(async () => {
    log('removeToken...');
    try {
      await AsyncStorage.removeItem(TOKEN_KEY);
      log('removeToken succeeded', token, value);
    } catch(error) {
      log('removeToken error', error);
    }
    setToken(null);
    dispatch({ type: SET_TOKEN, payload: { token: null } });
    return Promise.resolve(null);
  }, []);

  const value = { ...state, onLoadToken, onSignIn, onSignOut, onLoginSpotify };
  log('render', value);
  return (
    <Provider value={value}>
      {children}
    </Provider>
  );
};
