import React, { useCallback, useContext, useEffect } from 'react';
import { ChartContext } from './ChartContext';
import { getLogger } from '../core/log';
import { httpGetChart } from '../core/api';
import { Provider } from './ChartContext';
const log = getLogger('ChartStore');

const initialState = {
  isLoading: false,
  items: null,
  loadingError: null,
};

export const ChartStore = ({ children }) => {
  const [state, setState] = React.useState(initialState);
  const { isLoading, items, loadingError } = state;

  const onChartLoaded = useCallback(async () => {
    return httpGetChart('report')
    .then(chartReport => {
      setState({ isLoading: false, items: chartReport });
      return chartReport;
    })
    .catch(error => {
      log("Chart error" + error);
      return Promise.reject(error);
  })
  }, []);

  log('render', isLoading);
  const value = { ...state, onChartLoaded };
  return (
    <Provider value={value}>
      {children}
    </Provider>
  );
};
