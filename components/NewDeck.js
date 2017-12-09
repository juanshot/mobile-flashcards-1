import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { gray, lightGray, primary, white } from '../utils/colors';
import { connect } from "react-redux";
import { addDeck } from '../actions/index';

class NewDeck extends Component {
  state = {
    title: '',
  }

  submit() {
    const deck = {
      id: Date.now(),
      title: this.state.title,
    };

    this.props.dispatch(addDeck(deck));
    this.toHome();
    this.props.navigation.navigate(
      'Deck',
      deck
    );
    this.setState({title: ''});
  }

  toHome() {
    this.props.navigation.navigate('Decks');
  }

  render() {
    const disabled = this.state.title.trim().length === 0;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>What is the title of your new deck?</Text>
        <View style={styles.deckNameContainer}>
          <TextInput
            style={styles.deckNameInput}
            onChangeText={(title) => this.setState({title})}
            value={this.state.title}
            autoFocus={true}
          />
        </View>
        <TouchableOpacity
          style={[styles.submitBtn, disabled && styles.submitBtnDisabled]}
          disabled={disabled}
          onPress={() => {this.submit()}}
        >
          <Text style={styles.submitBtnText}>Add new deck</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default connect()(NewDeck);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    marginBottom: 10,
  },
  deckNameContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  deckNameInput: {
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