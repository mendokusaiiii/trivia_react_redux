import { SAVE_PLAYER, SUM_SCORE } from '../action';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_PLAYER:
    return {
      ...state,
      ...action.payload,
    };
  case SUM_SCORE:
    return {
      ...state,
      score: action.score,
    };
  default: return state;
  }
};

export default playerReducer;
