import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  TouchableOpacity
} from 'react-native';

export default class Setting extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Hello words!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '70%',
    height: '65%',
    zIndex: 6,
    backgroundColor: 'white'
  },

});