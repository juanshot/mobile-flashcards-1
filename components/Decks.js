import React, { Component } from 'react'
import { connect } from "react-redux"
import { View, Text } from 'react-native'
import { fetchDecks } from '../actions/index';

class Decks extends Component {
  componentDidMount() {
    this.props.dispatch(fetchDecks());
  }
  
  render() {
    return (
      <View>
        <Text>Decks</Text>
      </View>
    )
  }
}

function mapStateToProps (decks) {
  console.log(decks);
  return {
    decks
  }
}

export default connect(mapStateToProps)(Decks);