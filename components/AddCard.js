import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { connect } from "react-redux";
import { addCard } from '../actions/index';
import { button, input } from "../utils/styles";

class AddCard extends Component {
  static navigationOptions = {
    title: 'Add Card',
  }

  state = {
    question: '',
    answer: '',
  }

  submit() {
    this.props.dispatch(addCard(this.props.deck.id, {
      ...this.state,
    }));

    this.props.navigation.goBack();

    this.setState({
      question: '',
      answer: '',
    });
  }

  render() {
    const disabled = this.state.question.trim().length === 0 || this.state.answer.trim().length === 0;
    return (
      <View style={styles.container}>
        <Text style={input.label}>What is the questions?</Text>
        <View style={input.container}>
          <TextInput
            style={input.text}
            onChangeText={(question) => this.setState({question})}
            value={this.state.question}
            autoFocus={true}
          />
        </View>
        <Text style={input.label}>What is the answer?</Text>
        <View style={input.container}>
          <TextInput
            style={input.text}
            onChangeText={(answer) => this.setState({answer})}
            value={this.state.answer}
          />
        </View>
        <TouchableOpacity
          style={[button.btn, button.btnPrimary, disabled && button.btnDisabled]}
          disabled={disabled}
          onPress={() => {this.submit()}}
        >
          <Text style={button.btnLabel}>Add card</Text>
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
export default connect(mapStateToProps)(AddCard);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});