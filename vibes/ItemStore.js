import React, { useCallback, useContext, useEffect } from 'react';
import { ItemContext } from './ItemContext';
import { getLogger } from '../core/log';
import { httpGet, httpPostTrack, httpGetTracks } from '../core/api';
import { AuthContext } from '../authentification/AuthContext';
import { AsyncStorage } from 'react-native';

const log = getLogger('ItemStore');

const TRACKS_KEY = 'TRACKS';

const initialState = {
  isLoading: false,
  items: null,
  loadingError: null,
};

export const ItemStore = ({ children }) => {
  const [state, setState] = React.useState(initialState);
  const { isLoading, items, loadingError } = state;
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (token && !items && !loadingError && !isLoading) {
      log('load items started');
      setState({ isLoading: true, loadingError: null });
      httpGetTracks('v1/tracks/?ids=' + '10igKaIKsSB6ZnWxPxPvKO,' +
                                        '1AhDOtG9vPSOmsWgNW0BEY,' +
                                        '4Of7rzpRpV1mWRbhp5rAqG,' + 
                                        '2b8fOow8UzyDFAE27YhOZM,' + 
                                        '4VginDwYTP2eaHJzO0QMjG,' + 
                                        '1TfqLAPs4K3s2rJMoCokcS,' +
                                        '3M9Apu4OZfylLTFKvgEtKa,' + 
                                        '421leiR6jKlH5KDdwLYrOs,' + 
                                        '05OCY605lOXP7koHNBMPc2,' + 
                                        '30cW9fD87IgbYFl8o0lUze,' +
                                        '2F83FxNVkK6PPMHuYnwyVc')
        .then(json => {
          log('load items succeeded');
          setState({ isLoading: false, items: json });
          AsyncStorage.setItem(TRACKS_KEY, JSON.stringify(json))
            .catch(error => {
              log('save items error', error);
            });
        })
        .catch(loadingError => {
          log('load items failed ' + loadingError);
          setState({ isLoading: false, items: AsyncStorage.getItem(TRACKS_KEY) })
        });
    }
    else {
      async () => {
        setState({ isLoading: false, items: await AsyncStorage.getItem(TRACKS_KEY) });
      }
    }
  }, [token]);

  const onSubmit = useCallback(async (song, album) => {
    log('post track started ' + song);
    return httpPostTrack('addSong', { song, album })
      .then(json => {
        log('post track succeeded');
        return Promise.resolve(json);
      })
      .catch(error => {
        log('post track failed');
        return Promise.reject(error);
      });
  });

  log('render', isLoading);
  const value = { ...state, onSubmit };
  return (
    <ItemContext.Provider value={value}>
      {children}
    </ItemContext.Provider>
  );
};
