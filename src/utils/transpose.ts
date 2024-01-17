/**
 * 2차원 배열의 x축과 y축을 교체하는 배열 전치 함수입니다.
 * useVotingTimeTable에서는 props로 넘어오는 vote가 행,열이 바뀌어 있어서 정제하는 과정이 필요했습니다.
 *
 * @param array 2차원 배열
 * @returns 전치된 배열
 */
export const transpose = <T>(array: T[][]) => {
  return array[0].map((_, colIndex) => array.map((row) => row[colIndex]));
};
