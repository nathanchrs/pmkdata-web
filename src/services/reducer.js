import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import sessionReducer from './session/reducer';
import usersReducer from './users/reducer';
import studentsReducer from './students/reducer';
import interactionsReducer from './interactions/reducer';
import mentorsReducer from './mentors/reducer';
import eventsReducer from './events/reducer';
import menteesReducer from './mentees/reducer';
import interactionDetailReducer from './interaction_detail/reducer';

export const RESET_REDUX_STATE = 'RESET_REDUX_STATE';

const appReducer = combineReducers({
  form: reduxFormReducer,
  session: sessionReducer,
  users: usersReducer,
  students: studentsReducer,
  interactions: interactionsReducer,
  mentors: mentorsReducer,
  events: eventsReducer,
  interaction_detail: interactionDetailReducer,
  mentees: menteesReducer
});

const rootReducer = (state, action) => {
  if (action.type === RESET_REDUX_STATE) state = undefined;
  return appReducer(state, action);
};

export default rootReducer;
