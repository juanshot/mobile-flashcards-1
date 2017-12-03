import { AsyncStorage } from 'react-native'

const DECKS = 'DECKS';

export function getDecks() {
  return AsyncStorage.getItem(DECKS)
    .then(result => {
      const decks = JSON.parse(result);
      return decks || [];
    })
}

export function saveDecks(decks) {
  AsyncStorage.setItem(DECKS, JSON.stringify(decks));
}