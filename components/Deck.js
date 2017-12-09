import React, { Component } from 'react'
import { connect } from "react-redux"
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { white, lightGray, primary } from "../utils/colors";

class Deck extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      // This is quite a poor title implementation. Works for now
      // ToDo: Get title from redux store using connected component
      title: navigation.state.params.title,
    };
  }

  render() {
    const deck = this.props.deck;
    const disabled = deck.cards.length === 0;
    return (
      <View style={styles.container}>
        <Text style={styles.info}>{deck.cards.length} cards</Text>

        <TouchableOpacity
          style={[styles.btn]}
          onPress={() => {}}
        >
          <Text style={styles.btnText}>Add Card</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, disabled && styles.btnDisabled]}
          disabled={disabled}
          onPress={() => {}}
        >
          <Text style={styles.btnText}>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

function mapStateToProps (decks, { navigation }) {
  const { id } = navigation.state.params
  return {
    deck: decks.collection.find(deck => deck.id == id)
  };
}
export default connect(mapStateToProps)(Deck);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    fontSize: 22,
    marginBottom: 10,
  },
  btn: {
    backgroundColor: primary,
    padding: 10,
    borderRadius: 7,
    height: 45,
    width: '80%',
    marginBottom: 10
  },
  btnDisabled: {
    backgroundColor: lightGray,
  },
  btnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
});