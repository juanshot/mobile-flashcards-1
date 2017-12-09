import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { gray, lightGray, primary, white } from '../utils/colors';
import { connect } from "react-redux";
import { addCard } from '../actions/index';

class AddCard extends Component {
  static navigationOptions = {
    title: 'Add card',
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
        <Text style={styles.label}>What is the questions?</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={(question) => this.setState({question})}
            value={this.state.question}
            autoFocus={true}
          />
        </View>
        <Text style={styles.label}>What is the answer?</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={(answer) => this.setState({answer})}
            value={this.state.answer}
          />
        </View>
        <TouchableOpacity
          style={[styles.submitBtn, disabled && styles.submitBtnDisabled]}
          disabled={disabled}
          onPress={() => {this.submit()}}
        >
          <Text style={styles.submitBtnText}>Add card</Text>
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
  label: {
    fontSize: 22,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  input: {
    flex: 0.8,
    height: 40,
    borderColor: gray,
    borderWidth: 1,
    textAlign: 'center',
    borderRadius: 5,
  },
  submitBtn: {
    backgroundColor: primary,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  submitBtnDisabled: {
    backgroundColor: lightGray,
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
});