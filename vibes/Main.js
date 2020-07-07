import React , { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BackHandler } from "react-native";

/* useBackButton */
function useBackButton(navigation) {
    useEffect(() => {
      BackHandler.addEventListener("hardwareBackPress", navigation.goBack());
  
      return () => {
        BackHandler.removeEventListener(
          "hardwareBackPress",
          navigation.goBack()
        );
      };
    }, [navigation]);
  }

export const Main = ({ navigation }) => {
    //utilize custom hook
    //useBackButton(navigation);
    
    return (
        <View>
            <Text> Hello </Text>
        </View>
    );
}
