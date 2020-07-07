import { StyleSheet, Text, View , Alert } from 'react-native';
import { TextInput, Button  } from 'react-native-paper';
import React , { useState } from 'react';
import { AuthSession } from 'expo'
import { Avatar } from 'react-native-paper';
import { ActivityIndicator } from 'react-native';

import { Consumer } from './AuthContext';

export const Login = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    console.log(AuthSession.getRedirectUrl())
    return (
      <Consumer>
      {({ onSignIn, onLoginSpotify, signInError, signInInProgress }) => (
        <View style={styles.container}>
          <ActivityIndicator animating={signInInProgress} size="large"/>
          {signInError && <Text>{signInError.message || 'Sign in error'}</Text>}
          <TextInput
              mode = 'outlined'
              label = 'Email...'
              value = {email} 
              onChangeText={text => setEmail(text)}
          />
          <TextInput
              mode = 'outlined'
              label = 'Password...'
              value = {password}
              secureTextEntry={true}
              onChangeText={text=> setPassword(text)}
              
          />
          <Button 
              icon = "login-variant" 
              mode = "contained" 
              onPress = {() => {
                console.log('Pressed');
                onLoginSpotify("client_credentials")
                .then(() =>  
                        onSignIn(email, password)
                          .then(() => navigation.navigate('Todo'))
                          .catch((error) => 
                          {
                            Alert.alert(
                              'Error',
                              error,
                              [
                                {text: 'OK', onPress: () => console.log('OK Pressed')},
                              ],
                              {cancelable: false},
                            )
                            console.log(error)
                          }))
                .catch((error) => {
                  Alert.alert(
                    'Error',
                    error,
                    [
                      {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    {cancelable: false},
                  )
                  console.log(error)
                })
              }}
              style = {styles.loginBtn}>
            LOGIN
          </Button>
          <Avatar.Image 
              style={{
                  marginLeft: 84,
                  marginRight: 36,
                  marginTop: 24
              }}
              size={200} 
              source={require('../assets/logo.png')} />
        </View>
        )}
      </Consumer>
    );
  }
  
  Login.navigationOptions = {
    headerTitle: 'Login',
    headerStyle: {
      backgroundColor: 'lightblue',
    },
  };
  

  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#A4D7F3',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'stretch',
    },
  
    loginBtn: {
      marginTop: 4
    }
  });
  