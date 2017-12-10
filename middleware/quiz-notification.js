import { COMPLETE_QUIZ } from "../actions/index";
import { clearLocalNotification, setLocalNotification } from "../utils/notifications";

export const quizNotification = store => next => action => {
  const result = next(action);

  if (action.type !== COMPLETE_QUIZ) {
    return result;
  }

  const allQuizzesCompleted = store.getState().collection.find(deck => deck.quizCompleted !== action.date) === undefined;

  if (allQuizzesCompleted) {
    clearLocalNotification()
      .then(setLocalNotification);
  }

  return result;
};