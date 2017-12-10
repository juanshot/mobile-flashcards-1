import { getDecks, saveDecks } from '../utils/api';

export const SET_DECKS = 'SET_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const ADD_CARD = 'ADD_CARD';
export const COMPLETE_QUIZ = 'COMPLETE_QUIZ';

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

export function addCard(deckId, card) {
  return (dispatch, getState) => {
    dispatch({
      deckId,
      card,
      type: ADD_CARD,
    });

    saveDecks(getState().collection);
  }
}

export function completeQuiz(deckId, date) {
  return (dispatch, getState) => {
    dispatch({
      deckId,
      date,
      type: COMPLETE_QUIZ,
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