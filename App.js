import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';

import Getstarted from './components/start';
import Learning from './components/learning';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };

    this.handlePress = this.handlePress.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
  }

  handlePress(e) {
    this.setState(() => ({
      tapped: e,
    }));

    AsyncStorage.setItem('isFirstTime', 'true');
  }

  handleLoad = async () => {
    try {
      const isFirstTime = await AsyncStorage.getItem('isFirstTime');

      if (isFirstTime === 'true') {
        this.setState(() => ({
          tapped: true
        }));
      }
    }
    catch(err) {
      console.log(err);
    }
  }

  componentWillMount() {
    this.handleLoad();
  }

  render() {
    return (
      <View style={styles.container}>

        {(() => {
          if (this.state.tapped == true) {
            return <Learning />
          } else {
            return <Getstarted onHandlePress={this.handlePress} />
          }
        })()}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'black',
    fontWeight: '600'
  }
});
