import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { connect } from "react-redux";
import { addDeck } from '../actions/index';
import { button, input } from "../utils/styles";

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
        <Text style={input.label}>What is the title of your new deck?</Text>
        <View style={input.container}>
          <TextInput
            style={input.text}
            onChangeText={(title) => this.setState({title})}
            value={this.state.title}
            autoFocus={true}
          />
        </View>
        <TouchableOpacity
          style={[button.btn, button.btnPrimary, disabled && button.btnDisabled]}
          disabled={disabled}
          onPress={() => {this.submit()}}
        >
          <Text style={button.btnLabel}>Add new deck</Text>
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
});