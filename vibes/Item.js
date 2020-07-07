import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { getLogger } from '../core/log';
import { navService } from '../core'
const log = getLogger('Item');

export default ({ item = {}, navigation }) => {
  log('render');
  return (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: item.album.images[1].url }} />
      <Card.Content>
        <Title>{item.name}</Title>
        <Paragraph>{item.album.artists[0].name}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button
          onPress = {() => {
            Alert.alert(
              'Error',
              "Wait for the next update...",
              [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
              {cancelable: false},
            )
          }}>PLAY</Button>
          <Button
            onPress = {() => {
              navService.navigate('ItemEdit', {song: item.name, artist: item.album.artists[0].name})
          }}>SAVE_L</Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
   card: {
    margin: 16,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: 'black',
   }
});
