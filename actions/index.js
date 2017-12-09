import { getDecks, saveDecks } from '../utils/api';

export const SET_DECKS = 'SET_DECKS';
export const ADD_DECK = 'ADD_DECK';

export function setDecks(collection) {
  return {
    collection,
    type: SET_DECKS,
  }
}

export function addDeck(deck) {
  return (dispatch, getState) => {
    dispatch({
      deck,
      type: ADD_DECK,
    });

    saveDecks(getState().collection);
  }
}

export function fetchDecks() {
  return dispatch => {
    getDecks().then(collection => {
      dispatch(setDecks(collection))
    })
  }
}