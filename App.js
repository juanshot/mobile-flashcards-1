import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation'
import Decks from './components/Decks';
import NewDeck from './components/NewDeck';
import { Ionicons } from '@expo/vector-icons';
import { Constants } from 'expo'
import { applyMiddleware, createStore } from 'redux';
import reducer from './reducers';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import Deck from "./components/Deck";
import AddCard from "./components/AddCard";
import Quiz from "./components/Quiz";
import { setLocalNotification } from "./utils/notifications";
import { quizNotification } from "./middleware/quiz-notification";


const store = createStore(
    reducer,
    applyMiddleware(thunk, quizNotification)
);

function FlashCardsStatusBar (props) {
  return (
      <View style={{ height: Constants.statusBarHeight }}>
        <StatusBar translucent {...props} />
      </View>
  )
}

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
  },
},{
  navigationOptions: {
    header: null,
  },
},);

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  Deck: {
    screen: Deck,
  },
  AddCard: {
    screen: AddCard,
  },
  Quiz: {
    screen: Quiz,
  },
});

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <FlashCardsStatusBar barStyle="dark-content" />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
