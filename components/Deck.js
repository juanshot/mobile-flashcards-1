import React, { Component } from 'react'
import { connect } from "react-redux"
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { button } from "../utils/styles";

class Deck extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      // This is quite a poor title implementation. Works for now
      // ToDo: Get title from redux store using connected component
      title: navigation.state.params.title,
    };
  }

  render() {
    const { id, cards } = this.props.deck;
    const disabled = cards.length === 0;
    return (
      <View style={styles.container}>
        <Text style={styles.info}>{cards.length} card{(cards.length !== 1) && 's'}</Text>

        <TouchableOpacity
          style={[button.btn, button.btnPrimary]}
          onPress={() => this.props.navigation.navigate(
              'AddCard',
              { id }
            )}
        >
          <Text style={button.btnLabel}>Add Card</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[button.btn, button.btnSuccess, disabled && button.btnDisabled]}
          disabled={disabled}
          onPress={() => this.props.navigation.navigate(
            'Quiz',
            { id }
          )}
        >
          <Text style={button.btnLabel}>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

function mapStateToProps (decks, { navigation }) {
  const { id } = navigation.state.params;
  return {
    deck: decks.collection.find(deck => deck.id === id)
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
});