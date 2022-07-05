import { GET_PLAYER, UPDATE_SCORE, CONFIG_URL } from './actionTypes';

export const actGetPlayer = (name, gravatarEmail) => ({
  type: GET_PLAYER,
  payload: {
    name, gravatarEmail,
  },
});

export const actUpdateScore = (questionScore, assertion) => ({
  type: UPDATE_SCORE,
  payload: {
    questionScore,
    assertion,
  },
});

export const updateUrl = (configGame) => ({
  type: CONFIG_URL,
  payload: { ...configGame },
});
