import { answerSortTypes } from './';

const setAnswerSort = value => ({
  type: answerSortTypes.SET_ANSWER_SORT,
  value: value
});

export default { setAnswerSort }