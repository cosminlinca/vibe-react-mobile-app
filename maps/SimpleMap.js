import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Button } from 'react-native-paper';

export const SimpleMap = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <MapView 
        style={styles.mapStyle}>
           <MapView.Marker
            coordinate={{
              latitude: 46.770439,
              longitude: 23.591423}}
            title={"Cluj Napoca"}
            description={"Hello! Marker in Cluj Napoca"}
         />
      </MapView>
      <Button
          style = {styles.button}
          mode="outlined"
          onPress={() => navigation.navigate('Todo')}>
          Back
        </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginLeft: 2,
    position: 'absolute',
    top: '5%', //for center align
    alignSelf: 'flex-start' //for align to left
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});