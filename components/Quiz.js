import React, { Component } from 'react'
import { connect } from "react-redux"
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { button } from "../utils/styles";
import { warning, lightGray } from "../utils/colors";

class Quiz extends Component {
  static navigationOptions = {
    title: 'Quiz',
  }

  state = {
    card: 0,
    question: true,
    correct: 0,
  }

  submit(isCorrect) {
    this.setState({
      card: this.state.card + 1,
      correct: this.state.correct + (isCorrect ? 1 : 0),
      question: true,
    });
  }

  render() {
    const { cards } = this.props.deck;
    const { card, question, correct } = this.state;

    if (card === cards.length) {
      return (
        <View style={styles.container}>
          <Text style={styles.result}>You result is <Text style={styles.total}>{correct} / {cards.length}</Text></Text>

          <TouchableOpacity
            style={[button.btn, button.btnPrimary]}
            onPress={() => this.setState({card: 0, question: true, correct: 0})}
          >
            <Text style={button.btnLabel}>Restart Quiz</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[button.btn, button.btnSuccess]}
            onPress={() => this.props.navigation.goBack()}
          >
            <Text style={button.btnLabel}>Back to Deck</Text>
          </TouchableOpacity>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <Text style={styles.progress}>{card + 1} / {cards.length}</Text>
        <Text style={styles.cardText}>
          {question ? cards[card].question : cards[card].answer}
        </Text>
        <TouchableOpacity onPress={() => this.setState({question: !question})}>
          <Text style={styles.toggleAnswerText}>{question ? 'Answer' : 'Question'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[button.btn, button.btnSuccess]}
          onPress={() => this.submit(true)}
        >
          <Text style={button.btnLabel}>Correct</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[button.btn, button.btnWarning]}
          onPress={() => this.submit(false)}
        >
          <Text style={button.btnLabel}>Incorrect</Text>
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
export default connect(mapStateToProps)(Quiz);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progress: {
    color: lightGray,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 24,
    marginBottom: 10,
  },
  toggleAnswerText: {
    fontWeight: 'bold',
    color: warning,
    marginBottom: 20,
  },
  result: {
    fontSize: 32,
    marginBottom: 20,
  },
  total: {
    fontWeight: 'bold',
  },
});