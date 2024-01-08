// 입력 Date  -> 출력 'YYYY-MM-DD HH:mm:SS'
export const dateFormat = (date: Date) => {
  return `${date.getFullYear()}-${
    date.getMonth() + 1 < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  }-${
    date.getDate() < 9 ? '0' + date.getDate() : date.getDate()
  } ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};
