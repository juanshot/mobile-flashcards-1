import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TabNavigator } from 'react-navigation'
import Decks from './components/Decks';
import NewDeck from './components/NewDeck';
import { Ionicons } from '@expo/vector-icons';

const Tabs = TabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-list-outline' size={30} color={tintColor} />,
    },
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-add' size={30} color={tintColor} />,
    },
  }
});

export default class App extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Tabs />
      </View>
    );
  }
}
