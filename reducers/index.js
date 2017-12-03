import { SET_DECKS } from '../actions';
import { ADD_DECK } from '../actions/index';

function decks(state = [], action) {
  switch (action.type) {
    case SET_DECKS :
      return action.decks
    case ADD_DECK :
      return [
        ...state,
        {
          id: Date.now(),
          title: action.title,
          cards: [],
        }
      ];
    default :
      return state
  }
}

export default decks;