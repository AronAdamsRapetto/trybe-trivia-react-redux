import { GET_PLAYER, UPDATE_SCORE, CONFIG_URL } from '../actions/actionTypes';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  urlGame: 'https://opentdb.com/api.php?amount=5&token=',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_PLAYER:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.gravatarEmail,
      assertions: 0,
      score: 0,
    };
  case UPDATE_SCORE:
    return {
      ...state,
      score: state.score + action.payload.questionScore,
      assertions: state.assertions + action.payload.assertion,
    };
  case CONFIG_URL:
    return {
      ...state,
      urlGame: `https://opentdb.com/api.php?amount=5${action.payload.category}${action.payload.difficulty}${action.payload.type}&token=`,
    };
  default:
    return state;
  }
};

export default playerReducer;
