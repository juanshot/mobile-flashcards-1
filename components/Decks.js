import React, { Component } from 'react'
import { connect } from "react-redux"
import { ScrollView, Text, StyleSheet, View, TouchableOpacity, Animated } from 'react-native'
import { fetchDecks } from '../actions/index';
import { AppLoading} from 'expo'
import { gray, card } from "../utils/colors";

class Decks extends Component {
  static navigationOptions = {
    title: 'Decks',
  };

  state: {
    scales: {}
  }

  componentDidMount() {
    this.props.dispatch(fetchDecks());
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.decks) {
      this.setState({
        scales: nextProps.decks.collection.reduce((acc, deck) => {
          return {
            ...acc,
            [deck.id]: new Animated.Value(1),
          }
        }, {})
      })
    }
  }
  
  render() {
    if (!this.props.decks.loaded) {
      return (
        <AppLoading />
      );
    }

    if (this.props.decks.collection.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No card decks yet.</Text>
        </View>
      );
    }

    const collection = this.props.decks.collection;

    return (
      <ScrollView style={styles.container}>
        {collection.map(({id, title, cards}, i) => (
          <View style={[styles.card, (collection.length === i + 1) ? styles.cardLast : styles.cardNotLast ]} key={id}>
            <TouchableOpacity style={styles.cardButton} onPress={() => {
              Animated.timing(this.state.scales[id], {toValue: 5, duration: 50}).start(() => {
                this.props.navigation.navigate('Deck',{id, title});
                Animated.timing(this.state.scales[id], {toValue: 1, duration: 50}).start();
              });
          }}>
              <Animated.View style={{flex: 1, justifyContent: 'center', alignItems: 'center', transform: [{scale: this.state.scales[id]}]}}>
                <Text style={styles.cardName}>{title}</Text>
                <Text style={styles.cardInfo}>{cards.length} card{(cards.length !== 1) && 's'}</Text>
              </Animated.View>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    )
  }
}

function mapStateToProps (decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(Decks);

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 22,
    color: gray,
  },
  container: {
    flex: 1,
  },
  card: {
    flex: 1,
  },
  cardNotLast: {
    borderBottomColor: gray,
    borderBottomWidth: 1,
  },
  cardLast: {
    borderBottomWidth: 0,
  },
  cardButton: {
    flex: 1,
    paddingTop: 60,
    paddingBottom: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: card,
  },
  cardName: {
    fontSize: 22,
  },
  cardInfo: {
    fontSize: 18,
    color: gray,
  }
});