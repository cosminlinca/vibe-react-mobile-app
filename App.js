import React , { useState } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import navService from './core/navService';
import { Todo, ItemStore } from './vibes';
import { AuthLoading, Auth, AuthStore } from './authentification';
import { ChartStore } from './chart/ChartStore';
import { getLogger } from './core/log';
import { SimpleMap } from './maps/SimpleMap'
import { ChartReport } from './chart/ChartReport'
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { Transition } from 'react-native-reanimated';
const log = getLogger('App');

const AppContainer = createAppContainer(
  createAnimatedSwitchNavigator(
    { AuthLoading, Todo, Auth, SimpleMap, ChartReport },
    {
      transition: (
        <Transition.Together>
          <Transition.Out
            type="slide-right"     
            durationMs={1000}
            interpolation="easeIn"
          />
          <Transition.In type="slide-left" durationMs={1000} />
        </Transition.Together>
      ),
    }
  )
);

const App = () => {
  log("Here")
  return (
    <AuthStore>
      <ItemStore>
        <ChartStore>
        <AppContainer ref={navigatorRef => {
          navService.setTopLevelNavigator(navigatorRef);
        }} />
        </ChartStore>
      </ItemStore>
    </AuthStore>
  );
};

export default App;