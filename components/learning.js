import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  BackHandler
} from 'react-native';

import Wordbar from './wordbar';
import Settings from './settings';

export default class Learning extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      styles: {
        style: {color: 'black'},
        style2: {backgroundColor: 'white'},
        style3: {backgroundColor: '#484848'}
      },
      showMe: true,
      showSets: false
    };

    this.ChangeColor = this.ChangeColor.bind(this);
    this.ColorDark = this.ColorDark.bind(this);
    this.ColorLight = this.ColorLight.bind(this);
    this.Loading = this.Loading.bind(this);
    this.showSettins = this.showSettins.bind(this);
  }

  ColorDark() {
    this.setState(() => ({
      styles: {
        style: {color: 'white'},
        style2: {backgroundColor: '#484848'},
        style3: {backgroundColor: 'white'}
      }
    }));
  }

  ColorLight() {
    this.setState(() => ({
      styles: {
        style: {color: 'black'},
        style2: {backgroundColor: 'white'},
        style3: {backgroundColor: '#484848'}
      }
    }));
  }

  ChangeColor() {
    if (this.state.styles.style.color === 'black') {
      this.ColorDark();
      AsyncStorage.setItem('Color', 'white');
    } else {
      this.ColorLight();
      AsyncStorage.setItem('Color', 'black');
    }
  }

  Loading = async () => {
    try {
      const Color = await AsyncStorage.getItem('Color');

      if (Color === 'white') {
        this.ColorDark();
      } else {
        this.ColorLight();
      }
    }

    catch(err) {
      console.log(err);
    }
  }

  showSettins() {
    this.setState(prev => ({
      showSets: !prev.showSets
    }));
  }

  componentWillMount() {
    setTimeout(() => {
      this.setState({
        showMe: false
      });
    }, 2000);

    this.Loading();
  }

  exitFunction = () => {
    BackHandler.exitApp();
  }

  render() {
    if (this.state.showMe === true) {
      return <ActivityIndicator size="large" />;
    }

    return (
      <View style={[styles.container, this.state.styles.style2]}>

        <Wordbar wordStyle={[styles.text, this.state.styles.style]}/>
        {this.state.showSets && <Settings />}

        { Dimensions.get('window').height > 400 &&
          <View style={styles.bottomView}>
            <View style={styles.view}>
              <Text
                style={[styles.menu, {color: 'red'}]}
                onPress={this.exitFunction}
                >
                Exit
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.button, this.state.styles.style3]}
              onPress={this.ChangeColor}
              />
            <View style={styles.view}>
              <Text 
                style={[styles.menu]}
                onPress={this.showSettins}
                >
                settings
              </Text>
            </View>
          </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
  bottomView: {
    width: '100%',
    height: 55,
    borderStyle: 'solid',
    borderTopWidth: 0.5,
    borderTopColor: 'lightgrey',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    flexDirection:'row',
    flexWrap:'wrap'
  },
  text: {
    fontWeight: '600'
  },
  button: {
    height: 53,
    width: '18%',
    borderRadius: 1
  },
  menu: {
    fontSize: 20,
    textAlign: 'center'
  },
  view: {
    width: '35%'
  }
});
