import getAPIAnswer from '../../helpers/getAPIAnswer';

export const SAVE_PLAYER = 'SAVE_PLAYER';

export const savePlayer = (payload) => ({
  type: SAVE_PLAYER,
  payload,
});

export const SAVE_ANSWER = 'SAVE_ANSWER';

export const saveAnswer = (payload) => ({
  type: SAVE_ANSWER,
  payload,
});

export const ANSWER_API_ERROR = 'ANSWER_API_ERROR';

export const answerAPIError = (message) => ({
  type: ANSWER_API_ERROR,
  errorMessage: message,
});

export const fetchAPIAnswer = () => async (dispatch) => {
  try {
    const payload = await getAPIAnswer();
    dispatch(saveAnswer(payload));
  } catch (error) {
    dispatch(answerAPIError(error.message));
  }
};
