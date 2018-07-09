import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  Alert
} from 'react-native';

const api = require('./api/words.json');

export default class Wordbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actIn: false,
      styles: [{},{},{},{}]
    };

    this.currentWords = Object.keys(api);
    this.word;
    this.uaList;

    this.Random = this.Random.bind(this);
    this.shuffleArray = this.shuffleArray.bind(this);

    this.handlePress = this.handlePress.bind(this);
    this.randomWord = this.randomWord.bind(this);
  }

  Random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
  }

  handlePress(e, key) {
    if (e === api[this.word].ua) {
      this.setState(() => ({actIn: true}));

      setTimeout(() => {
        this.setState(() => ({actIn: false}));
      }, 250);

      let supp = this.state.styles;

      for (let i = 0; i < 4; i++) {
        supp[i] = {};
      }

      this.randomWord();
    } else {
      let supp = this.state.styles;
      supp[key] = {color: 'red'};

      this.setState(() => ({styles: supp}))
    }
  }

  randomWord() {
    let indx = this.Random(0, this.currentWords.length - 1);

    if (this.word === this.currentWords[indx]) {
        this.randomWord();
    } else {
      this.word = this.currentWords[indx];
      this.uaList = [api[this.word].ua];

      let i = 0;
      while (i < 3) {
        let r = this.Random(0, this.currentWords.length - 1);

        if (this.uaList.indexOf(api[this.currentWords[r]].ua) === -1) {
          this.uaList.push(api[this.currentWords[r]].ua);
          i++;
        }
      }

      this.shuffleArray(this.uaList);
    }
  }

  componentWillMount() {
    this.randomWord();
  }

  render() {
    return (
      <View>
        <Text style={[this.props.wordStyle, styles.text]}>{this.word.toUpperCase()}</Text>

        {
            this.state.actIn &&
            <ActivityIndicator size="large"/>
        }

        <Text style={[this.props.wordStyle, styles.transcription]}>
          {api[this.word].transcription}
        </Text>

         {
          this.uaList.map((item, key) =>
           (
             <Text
               onPress={() => this.handlePress(item, key)}
               key={item}
               style={[this.props.wordStyle, styles.answer, this.state.styles[key]]}
               >
               { item }
             </Text>
           ))
         }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: Dimensions.get('window').height > 400 ? 35 : 15,
    marginBottom: Dimensions.get('window').height > 230 ? 50 : 0,
    marginTop: -60,
    textAlign: 'center',
    fontFamily: 'sans-serif-thin'
  },
  transcription: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 16
  },
  answer: {
    fontFamily: 'sans-serif-thin',
    fontSize: Dimensions.get('window').height > 400 ? 25 : 15,
    textAlign: 'center',
    borderWidth:1,
    paddingLeft: '12%',
    paddingRight: '12%',
    paddingTop: 3,
    paddingBottom: 3,
    marginBottom: Dimensions.get('window').height > 230 ? 10 : 0,
    borderRadius: 10
  }
});
