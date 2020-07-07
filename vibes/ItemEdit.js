import React, { Component, useState }  from 'react';
import { View, StyleSheet } from 'react-native'
import { TextInput, Button  } from 'react-native-paper';
import { ItemContext } from "./ItemContext";

export const ItemEdit = ({ navigation }) => {
  const [song, setSong] = useState(navigation.getParam('song'));
  const [artist, setArtist] = useState(navigation.getParam('artist'));
  
  return (
    <ItemContext.Consumer>
      {({ onSubmit }) => (
        <View style={styles.container}>
          <TextInput
                mode = 'flat'
                label = 'Song'
                value = { song } 
                onChangeText={text => setSong(text)}
            />
          <TextInput
              mode = 'flat'
              label = 'Artist'
              value = { artist }
              onChangeText={text => setArtist(text)}
          />
          <Button
            style = {{
              marginTop: 4
            }}
            icon = "plus" 
            mode = "contained" 
            onPress={() => {
              onSubmit(song, artist)
                .then(() => navigation.goBack())
            }}
          >Save song locally</Button>
        </View>
      )}
    </ItemContext.Consumer>
  );
};

ItemEdit.navigationOptions = () => ({
  headerTitle: 'Edit/Save mode',
  headerStyle: {
    backgroundColor: 'lightblue',
  },
});

const styles = StyleSheet.create({
  container: {
    margin: 8,
    backgroundColor: '#A4D7F3',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
  },

  loginBtn: {
    marginTop: 4
  }
});
