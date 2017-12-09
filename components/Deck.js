import React, { Component } from 'react'
import { connect } from "react-redux"
import { View, Text, StyleSheet } from 'react-native'

class Deck extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      // This is quite a poor title implementation. Works for now
      // ToDo: Get title from redux store using connected component
      title: navigation.state.params.title,
    };
  }

  render() {
    return (
      <View style={styles.container}><Text>Deck</Text></View>
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
  }
});