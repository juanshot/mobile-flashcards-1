import { SET_DECKS, ADD_DECK, ADD_CARD } from '../actions';

function decks(state = {loaded: false, collection: []}, action) {
  switch (action.type) {
    case SET_DECKS :
      return {
        loaded: true,
        collection: action.collection,
      };
    case ADD_DECK :
      return {
        ...state,
        collection: [
          ...state.collection,
          {
            ...action.deck,
            cards: [],
          }
        ]
      };
    case ADD_CARD :
      return {
        ...state,
        collection: state.collection.map(deck => {
          if (deck.id !== action.deckId) {
            return deck;
          }

          return {
            ...deck,
            cards: [
              ...deck.cards,
              action.card,
            ]
          };
        })
      };
    default :
      return state
  }
}

export default decks;