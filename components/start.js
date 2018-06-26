import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';

export default class Getstarted extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.handlePress = this.handlePress.bind(this);
  }

  handlePress(e) {
    const clicked = true;
    this.props.onHandlePress(clicked);

    this.setState(() => ({
      tapped: true
    }));
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../img/bg.jpg')}
          style={styles.background}
        />
        <Text style={styles.text}>Англійські слова Advanced-level</Text>
        <Text style={[styles.text, styles.text2]}>
          Тут ви можете вдосконалити ваші знання англійської мови вивчивши понад 100 маловідомих студентам слів
        </Text>
        <View style={styles.button1}>
          <Button
            title="почати"
            color="#77b2d4"
            onPress={this.handlePress}
            tapped={this.state.tapped}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '800',
    fontSize: 35,
    textShadowColor: 'black',
    textShadowOffset: {width: -3, height: 2},
    textShadowRadius: 25
  },
  text2: {
    fontWeight: '300',
    fontSize: 18,
    marginTop: 35,
    paddingLeft: 30,
    paddingRight: 30,
    lineHeight: 30
  },
  background: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  button1: {
    width: '60%',
    height: '10%',
    marginTop: 35,
    margin: 20,
  }
});
