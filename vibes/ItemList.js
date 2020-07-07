import React, { useContext, useReducer } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { getLogger } from '../core/log';
import { navService } from '../core/navService';
import { ItemContext } from './ItemContext';
import { AuthContext } from '../authentification/AuthContext';
import Item from './Item';
import { ChartContext } from '../chart/ChartContext';

export const ItemList = ({ navigation }) => {
  const { onSignOut } = useContext(AuthContext);
  const { onChartLoaded } = useContext(ChartContext);

  return (
    <View style = {styles.container}>
      <ItemContext.Consumer>
        {({ isLoading, loadingError, items }) => (
          <View>
            <Button
              icon = "arrow-left"
              style = {styles.button}
              mode="contained"
              onPress={() => onSignOut().then(() => navigation.navigate('Auth'))}>
                Sign out
            </Button>
            <Button
              icon = "map"
              style = {styles.button}
              mode="contained"
              onPress={() => navigation.navigate('SimpleMap')}>
                Maps
            </Button>
            <Button
              icon = "brush"
              style = {styles.button}
              mode="contained"
              onPress={() => onChartLoaded().then(() => navigation.navigate('ChartReport'))}>
                Chart
            </Button>
            <ActivityIndicator animating={!!isLoading} size="large"/>
            {loadingError && <Text>{loadingError.message || 'Loading error'}</Text>}
            {items &&
              <FlatList
                style = {styles.container}
                data={items.tracks.map(item => ({ ...item, key: item.id }))}
                renderItem={({ item }) => <Item item={item}/>}
              />}
          </View>
        )}
      </ItemContext.Consumer>
    </View>
  )
};

ItemList.navigationOptions = {
  headerTitle: 'Tracks',
  headerStyle: {
    backgroundColor: 'lightblue',
  },
};

const styles = StyleSheet.create({
  button: {
    margin: 8
  },
  container: {
    backgroundColor: '#A4D7F3',
  },
});


