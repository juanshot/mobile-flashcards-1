import { SET_DECKS } from '../actions';
import { ADD_DECK } from '../actions/index';

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
    default :
      return state
  }
}

export default decks;